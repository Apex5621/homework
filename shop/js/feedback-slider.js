export const feedbackSlider = () => {
  new Swiper('.feedback__slider', {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 20,
    loop: true,
    speed: 500,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      prevEl: '.feedback__slider-button--prev',
      nextEl: '.feedback__slider-button--next',
    },
  })
}
