import BurgerMenu from "./burger.js";
import { feedbackSlider } from "./feedback-slider.js";

const commercial = document.querySelector(".commercial");
const commercialCloseButton = document.querySelector(".commercial__close");
const sticky = document.querySelector(".sticky");

if (sticky) {
  const updateHeaderOffset = () => {
    const height = Math.ceil(sticky.getBoundingClientRect().height);

    document.documentElement.style.setProperty(
      "--fixed-header-offset",
      `${height}px`,
    );
  };

  updateHeaderOffset();

  if ("ResizeObserver" in window) {
    const stickyObserver = new ResizeObserver(updateHeaderOffset);

    stickyObserver.observe(sticky);
  }
}

commercialCloseButton?.addEventListener("click", () => {
  commercial?.classList.add("commercial--hidden");
});

try {
  new BurgerMenu(
    {
      BURGER: "burger",
      BURGER_OPEN: "burger--open",
      HEADER_MENU: "header__menu",
      HEADER_MENU_OPEN: "header__menu--open",
      LABEL: {
        OPEN: "Открыть меню",
        CLOSE: "Закрыть меню",
      },
      PAGE_BODY: "page__body",
      PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
      MENU_LINK: "menu__link",
      BREAKPOINT: 790,
      MAIN: "main",
    },
  );

  feedbackSlider();
} catch (error) {
  console.error(error);
}
