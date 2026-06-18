import BurgerMenu from "./burger.js";
import { feedbackSlider } from "./feedback-slider.js";

const ad = document.querySelector(".body__ad");
const adCloseButton = document.querySelector(".body__ad-close");
const page = document.querySelector(".page");
const pageBody = document.querySelector(".page__body");

adCloseButton?.addEventListener("click", () => {
  ad?.classList.add("body__ad--hidden");
  page?.classList.add("page--ad-hidden");
  pageBody?.classList.add("page__body--ad-hidden");
});

try {
  new BurgerMenu(
    {
      BURGER: "burger",
      BURGER_OPEN: "burger--open",
      HEADER_MENU: "header__menu",
      HEADER_MENU_OPEN: "header__menu--open",
      lABEL: {
        OPEN: "Открыть меню",
        CLOSE: "Закрыть меню",
      },
      PAGE_BODY: "page__body",
      PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
      MENU_LINK: "menu__link",
      BREAKPOINT: 768,
    },
  );

  feedbackSlider();
} catch (error) {
  console.error(error);
}
