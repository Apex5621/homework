const SHOP_MENU_ITEM_SELECTOR = '.menu__item--shop'
const SHOP_MENU_BUTTON_SELECTOR = '.menu__link-magazine'
const SHOP_MENU_NAV_SELECTOR = '.menu__shop-nav'
const SHOP_MENU_LINK_SELECTOR = '.menu__shop-link'
const SHOP_MENU_OPEN_CLASS = 'menu__item--shop-open'

export const initShopMenu = () => {
  const shopMenuItem = document.querySelector(SHOP_MENU_ITEM_SELECTOR)
  const shopMenuButton = shopMenuItem?.querySelector(SHOP_MENU_BUTTON_SELECTOR)
  const shopMenuNav = shopMenuItem?.querySelector(SHOP_MENU_NAV_SELECTOR)
  const shopMenuLinks = shopMenuNav?.querySelectorAll(SHOP_MENU_LINK_SELECTOR)

  if (!shopMenuItem || !shopMenuButton || !shopMenuNav || !shopMenuLinks) return

  const isShopMenuOpen = () => shopMenuItem.classList.contains(SHOP_MENU_OPEN_CLASS)

  const updateShopMenuLinksAvailability = isOpen => {
    shopMenuLinks.forEach(shopMenuLink => {
      if (isOpen) {
        shopMenuLink.removeAttribute('tabindex')
        return
      }

      shopMenuLink.setAttribute('tabindex', '-1')
    })
  }

  const updateShopMenu = isOpen => {
    shopMenuItem.classList.toggle(SHOP_MENU_OPEN_CLASS, isOpen)
    shopMenuButton.setAttribute('aria-expanded', String(isOpen))
    shopMenuNav.setAttribute('aria-hidden', String(!isOpen))
    updateShopMenuLinksAvailability(isOpen)
  }

  const closeShopMenu = (shouldReturnFocus = false) => {
    updateShopMenu(false)

    if (shouldReturnFocus) {
      shopMenuButton.focus()
    }
  }

  updateShopMenu(false)

  shopMenuButton.addEventListener('click', () => {
    updateShopMenu(!isShopMenuOpen())
  })

  shopMenuLinks.forEach(shopMenuLink => {
    shopMenuLink.addEventListener('click', () => {
      closeShopMenu()
    })
  })

  document.addEventListener('click', event => {
    if (!isShopMenuOpen()) return
    if (!(event.target instanceof Element)) return
    if (shopMenuItem.contains(event.target)) return

    closeShopMenu()
  })

  document.addEventListener(
    'keydown',
    event => {
      if (event.key !== 'Escape') return
      if (!isShopMenuOpen()) return

      event.preventDefault()
      event.stopPropagation()
      closeShopMenu(true)
    },
    true,
  )
}
