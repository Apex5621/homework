export default class BurgerMenu {
	constructor(config, headerFixedInstance = null) {
		this.config = config;
		this.burgerButton = document.querySelector(`.${this.config.BURGER}`);
		this.burgerMenu = document.querySelector(`.${this.config.HEADER_MENU}`);
		this.body = document.querySelector(`.${this.config.PAGE_BODY}`);
		this.headerFixedInstance = headerFixedInstance;
		this.main = document.querySelector(`.${this.config.MAIN}`);

		if (!this.burgerButton || !this.burgerMenu || !this.body) {
			throw new Error('Required DOM elements are missing.');
		}

		this.isMobileView = window.innerWidth <= this.config.BREAKPOINT;

		this.onBurgerClick = this.onBurgerClick.bind(this);
		this.onBodyClick = this.onBodyClick.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);

		this.manageEvents();
		window.addEventListener('resize', this.onWindowResize);
	}

	manageEvents() {
		if (this.isMobileView) {
			this.initEvents();
		} else {
			this.removeEvents();
			this.hideBurgerMenu();
		}
	}

	initEvents() {
		// Click events
		this.burgerButton.addEventListener('click', this.onBurgerClick);
		this.body.addEventListener('click', this.onBodyClick);
		document.addEventListener('keydown', this.onKeyDown);

		// Touch events
		this.body.addEventListener('touchstart', this.handleTouchStart);
		this.body.addEventListener('touchmove', this.handleTouchMove);
		this.body.addEventListener('touchend', this.handleTouchEnd);
	}

	removeEvents() {
		// Click events
		this.burgerButton.removeEventListener('click', this.onBurgerClick);
		this.body.removeEventListener('click', this.onBodyClick);
		document.removeEventListener('keydown', this.onKeyDown);

		// Touch events
		this.body.removeEventListener('touchstart', this.handleTouchStart);
		this.body.removeEventListener('touchmove', this.handleTouchMove);
		this.body.removeEventListener('touchend', this.handleTouchEnd);
	}

	onWindowResize() {
		const isNowMobileView = window.innerWidth <= this.config.BREAKPOINT;

		if (this.isMobileView !== isNowMobileView) {
			this.isMobileView = isNowMobileView;
			this.manageEvents();
		}
	}

	// Click events
	onBurgerClick() {
		const isOpen = this.burgerButton.classList.toggle(this.config.BURGER_OPEN);
		this.burgerButton.ariaLabel = isOpen
				? this.config.LABEL.CLOSE
				: this.config.LABEL.OPEN;
		this.burgerButton.ariaExpanded = isOpen;
		this.burgerMenu.classList.toggle(this.config.HEADER_MENU_OPEN, isOpen);
		this.body.classList.toggle(this.config.PAGE_BODY_NO_SCROLL, isOpen);

		if (isOpen) {
			const firstMenuLink = this.burgerMenu.querySelector(
				`.${this.config.MENU_LINK}`,
			);

			requestAnimationFrame(() => firstMenuLink?.focus());
		}

		if (this.main) {
			this.main.style.pointerEvents = isOpen ? 'none' : '';
		}

		if (this.headerFixedInstance) {
			if (isOpen) {
				this.headerFixedInstance.removeFixedClass();
			} else {
				this.headerFixedInstance.updateFixedClass();
			}
		}
	}

	hideBurgerMenu(returnFocus = false) {
		const wasOpen = this.isBurgerMenuOpen();
		this.burgerButton.classList.remove(this.config.BURGER_OPEN);
			this.burgerButton.ariaLabel = this.config.LABEL.OPEN;
		this.burgerButton.ariaExpanded = false;
		this.burgerMenu.classList.remove(this.config.HEADER_MENU_OPEN);
		this.body.classList.remove(this.config.PAGE_BODY_NO_SCROLL);

		if (returnFocus && wasOpen) {
			this.burgerButton.focus();
		}

		if (this.main) {
			this.main.style.pointerEvents = '';
		}

		if (wasOpen && this.headerFixedInstance) {
			this.headerFixedInstance.updateFixedClass();
		}
	}

	isBurgerMenuOpen() {
		return this.burgerMenu.classList.contains(this.config.HEADER_MENU_OPEN);
	}

	getFocusableElements() {
		return [
			this.burgerButton,
			...this.burgerMenu.querySelectorAll(
				'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
			),
		];
	}

	onKeyDown(event) {
		if (!this.isBurgerMenuOpen()) return;

		if (event.key === 'Escape') {
			event.preventDefault();
			this.hideBurgerMenu(true);
			return;
		}

		if (event.key !== 'Tab') return;

		const focusableElements = this.getFocusableElements();
		const firstElement = focusableElements[0];
		const lastElement = focusableElements.at(-1);

		if (event.shiftKey && document.activeElement === firstElement) {
			event.preventDefault();
			lastElement.focus();
		} else if (!event.shiftKey && document.activeElement === lastElement) {
			event.preventDefault();
			firstElement.focus();
		}
	}

	onBodyClick(event) {
		const target = event.target;
		const isLinkInMenu = target.classList.contains(this.config.MENU_LINK);
		const isMenuOpen = this.isBurgerMenuOpen();
		const isClickOutsideMenu =
			!target.closest(`.${this.config.HEADER_MENU}`) &&
			!target.closest(`.${this.config.BURGER}`);

		if (
			(isLinkInMenu && window.innerWidth <= this.config.BREAKPOINT) ||
			(isMenuOpen && isClickOutsideMenu)
		) {
			this.hideBurgerMenu();
		}
	}

	// Touch events
	handleTouchStart(event) {
		if (!this.isBurgerMenuOpen()) return;
		this.touchStartX = event.changedTouches[0].screenX;
		this.burgerMenu.style.transition = 'none';
	}

	handleTouchMove(event) {
		if (!this.isBurgerMenuOpen()) return;
		const currentX = event.changedTouches[0].screenX;
		const translateX = Math.max(0, this.touchStartX - currentX);
		this.burgerMenu.style.left = `-${translateX}px`;
	}

	handleTouchEnd(event) {
		if (!this.isBurgerMenuOpen()) return;
		const touchEndX = event.changedTouches[0].screenX;
		const swipeDistance = this.touchStartX - touchEndX;

		this.burgerMenu.style.transition = '';
		this.burgerMenu.style.left = '';

		if (swipeDistance > 74) {
			this.hideBurgerMenu();
		}
	}
}
