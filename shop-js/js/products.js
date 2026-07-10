import { productsBySection } from './products-data.js'

const PRODUCT_SECTION_SELECTOR = '[data-products-section]'

const PRODUCT_IMAGE_WIDTH = 295

const PRODUCT_IMAGE_HEIGHT = 298

const PRODUCT_EXTRA_CLASS = 'article--extra'

const PRODUCTS_EXPANDED_CLASS = 'article-wrapper--expanded'

const PRODUCTS_BUTTON_CLOSE_TEXT = 'Закрыть'

const productsRelatedSections = {
  receipts: 'leaders',
  leaders: 'receipts',
}

const formatPrice = price => `₽${price}`

const createElement = (tagName, classNames = []) => {
  const element = document.createElement(tagName)

  if (classNames.length) {
    element.classList.add(...classNames)
  }

  return element
}

const createProductImage = product => {
  const pictureElement = createElement('picture', ['article-picture'])
  const sourceElement = document.createElement('source')
  const imageElement = createElement('img', ['article-image'])

  sourceElement.srcset = product.image.webp
  sourceElement.type = 'image/webp'

  imageElement.src = product.image.jpg
  imageElement.width = PRODUCT_IMAGE_WIDTH
  imageElement.height = PRODUCT_IMAGE_HEIGHT
  imageElement.loading = 'lazy'
  imageElement.alt = product.image.alt

  pictureElement.append(sourceElement, imageElement)

  return pictureElement
}

const createStarIcon = isHalfStar => {
  const starElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const useElement = document.createElementNS('http://www.w3.org/2000/svg', 'use')

  starElement.classList.add('article-star')
  starElement.setAttribute('width', isHalfStar ? '9' : '18')
  starElement.setAttribute('height', '17')

  if (isHalfStar) {
    starElement.classList.add('article-star--half')
  }

  useElement.setAttribute('href', isHalfStar ? './icons/main-sprite.svg#star-half' : './icons/main-sprite.svg#star')

  starElement.append(useElement)

  return starElement
}

const createProductRating = rating => {
  const ratingElement = createElement('div', ['article-rating'])
  const starsElement = createElement('div', ['article-stars'])
  const ratingTextElement = createElement('p', ['article-rating-text'])
  const fullStarsCount = Math.floor(rating)
  const hasHalfStar = !Number.isInteger(rating)

  starsElement.setAttribute('aria-hidden', 'true')

  for (let i = 0; i < fullStarsCount; i += 1) {
    starsElement.append(createStarIcon(false))
  }

  if (hasHalfStar) {
    starsElement.append(createStarIcon(true))
  }

  ratingTextElement.textContent = `${rating.toFixed(1)}/5`

  ratingElement.append(starsElement, ratingTextElement)

  return ratingElement
}

const createProductPrice = product => {
  if (!product.oldPrice && !product.discount) {
    const priceElement = createElement('p', ['article-price'])
    priceElement.textContent = formatPrice(product.price)

    return priceElement
  }

  const priceWrapperElement = createElement('div', ['article-price-wrapper'])
  const priceElement = createElement('p', ['article-price'])
  const oldPriceElement = createElement('p', ['article-old-price', 'discount'])
  const discountElement = createElement('p', ['article-discount'])

  priceElement.textContent = formatPrice(product.price)
  oldPriceElement.textContent = formatPrice(product.oldPrice)
  discountElement.textContent = product.discount

  priceWrapperElement.append(priceElement, oldPriceElement, discountElement)

  return priceWrapperElement
}

const createProductCard = (product, isExtraProduct = false) => {
  const articleElement = createElement('article', ['article'])
  const linkElement = createElement('a', ['article__link'])
  const titleElement = createElement('h3', ['article-title', 'title-small'])

  if (isExtraProduct) {
    articleElement.classList.add(PRODUCT_EXTRA_CLASS)
  }

  linkElement.href = '#'
  titleElement.textContent = product.title

  linkElement.append(
    createProductImage(product),
    titleElement,
    createProductRating(product.rating),
    createProductPrice(product),
  )
  articleElement.append(linkElement)

  return articleElement
}

const updateProductsButton = (buttonElement, isExpanded) => {
  const buttonText = isExpanded ? PRODUCTS_BUTTON_CLOSE_TEXT : buttonElement.dataset.defaultText

  buttonElement.textContent = buttonText
  buttonElement.title = buttonText
  buttonElement.setAttribute('aria-label', buttonText)
  buttonElement.setAttribute('aria-expanded', String(isExpanded))
}

const initProductsButton = (sectionElement, productsWrapperElement) => {
  const buttonElement = sectionElement.closest('section')?.querySelector('.button-more')

  if (!buttonElement) return

  buttonElement.dataset.defaultText = buttonElement.textContent.trim()
  buttonElement.setAttribute('aria-expanded', 'false')

  buttonElement.addEventListener('click', () => {
    const isExpanded = productsWrapperElement.classList.toggle(PRODUCTS_EXPANDED_CLASS)

    updateProductsButton(buttonElement, isExpanded)
  })
}

export const initProductCards = () => {
  const productSectionElements = document.querySelectorAll(PRODUCT_SECTION_SELECTOR)

  productSectionElements.forEach(sectionElement => {
    const sectionName = sectionElement.dataset.productsSection
    const products = productsBySection[sectionName]
    const extraProducts = productsBySection[productsRelatedSections[sectionName]]

    if (!products) return

    sectionElement.replaceChildren(
      ...products.map(product => createProductCard(product)),
      ...(extraProducts || []).map(product => createProductCard(product, true)),
    )
    initProductsButton(sectionElement, sectionElement)
  })
}
