import { getNewsletterEmailsFromLocalStorage, setNewsletterEmailsToLocalStorage } from './storage.js'

const NEWSLETTER_MODAL_OPEN_CLASS = 'newsletter-modal--open'
const MILLISECONDS_IN_SECOND = 1000

const convertCssTimeToMilliseconds = time => {
  const normalizedTime = time.trim()

  if (normalizedTime.endsWith('ms')) {
    return Number.parseFloat(normalizedTime)
  }

  if (normalizedTime.endsWith('s')) {
    return Number.parseFloat(normalizedTime) * MILLISECONDS_IN_SECOND
  }

  return 0
}

export const initNewsletter = () => {
  const newsletterForm = document.querySelector('.footer__newsletter-form')
  const newsletterInput = document.querySelector('.footer__newsletter-input')
  const newsletterModal = document.querySelector('.newsletter-modal')
  const newsletterModalCloseButton = document.querySelector('.newsletter-modal__close')
  const newsletterModalCancelButton = document.querySelector('.newsletter-modal__button--cancel')
  const newsletterModalConfirmButton = document.querySelector('.newsletter-modal__button--confirm')

  if (
    !newsletterForm ||
    !newsletterInput ||
    !newsletterModal ||
    !newsletterModalCloseButton ||
    !newsletterModalCancelButton ||
    !newsletterModalConfirmButton
  ) {
    return
  }

  const newsletterEmails = getNewsletterEmailsFromLocalStorage()
  let closeTimeoutId = null
  let activeElementBeforeOpen = null
  let lastSavedNewsletterEmail = null

  const getModalTransitionDuration = () => {
    const modalStyles = window.getComputedStyle(newsletterModal)
    const durations = modalStyles.transitionDuration.split(',').map(convertCssTimeToMilliseconds)
    const delays = modalStyles.transitionDelay.split(',').map(convertCssTimeToMilliseconds)

    return Math.max(...durations.map((duration, index) => duration + (delays[index] || 0)))
  }

  const focusActiveElementBeforeOpen = () => {
    if (!(activeElementBeforeOpen instanceof HTMLElement)) return

    activeElementBeforeOpen.focus()
  }

  const openNewsletterModal = () => {
    window.clearTimeout(closeTimeoutId)
    activeElementBeforeOpen = document.activeElement

    if (!newsletterModal.open) {
      newsletterModal.showModal()
    }

    requestAnimationFrame(() => {
      newsletterModal.classList.add(NEWSLETTER_MODAL_OPEN_CLASS)
      newsletterModalCloseButton.focus()
    })
  }

  const closeNewsletterModal = (shouldReturnFocus = true) => {
    if (!newsletterModal.open) return

    window.clearTimeout(closeTimeoutId)
    newsletterModal.classList.remove(NEWSLETTER_MODAL_OPEN_CLASS)

    closeTimeoutId = window.setTimeout(() => {
      if (newsletterModal.open) {
        newsletterModal.close()
      }

      if (shouldReturnFocus) {
        focusActiveElementBeforeOpen()
      }
    }, getModalTransitionDuration())
  }

  const saveNewsletterEmail = () => {
    const email = newsletterInput.value.trim()

    if (!email) {
      newsletterInput.focus()
      return false
    }

    newsletterEmails.push(email)
    lastSavedNewsletterEmail = email
    setNewsletterEmailsToLocalStorage(newsletterEmails)

    return true
  }

  const removeLastSavedNewsletterEmail = () => {
    if (!lastSavedNewsletterEmail) return

    const emailIndex = newsletterEmails.lastIndexOf(lastSavedNewsletterEmail)

    if (emailIndex === -1) return

    newsletterEmails.splice(emailIndex, 1)
    lastSavedNewsletterEmail = null
    setNewsletterEmailsToLocalStorage(newsletterEmails)
  }

  newsletterForm.addEventListener('submit', event => {
    event.preventDefault()

    newsletterInput.value = newsletterInput.value.trim()

    if (!newsletterForm.reportValidity()) return
    if (!saveNewsletterEmail()) return

    newsletterForm.reset()
    openNewsletterModal()
  })

  newsletterModalCloseButton.addEventListener('click', () => {
    closeNewsletterModal()
  })

  newsletterModalCancelButton.addEventListener('click', () => {
    removeLastSavedNewsletterEmail()
    closeNewsletterModal()
  })

  newsletterModalConfirmButton.addEventListener('click', () => {
    lastSavedNewsletterEmail = null
    closeNewsletterModal()
  })

  newsletterModal.addEventListener('click', event => {
    if (event.target !== newsletterModal) return

    closeNewsletterModal()
  })

  newsletterModal.addEventListener('cancel', event => {
    event.preventDefault()
    closeNewsletterModal()
  })
}
