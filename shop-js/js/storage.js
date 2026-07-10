const STORAGE_KEYS = {
  SEARCH_HISTORY: 'searchHistory',
  NEWSLETTER_EMAILS: 'newsletterEmails',
}

const getArrayFromLocalStorage = key => {
  try {
    const storageValue = JSON.parse(localStorage.getItem(key))

    return Array.isArray(storageValue) ? storageValue : []
  } catch {
    return []
  }
}

const setArrayToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getSearchHistoryFromLocalStorage = () => {
  return getArrayFromLocalStorage(STORAGE_KEYS.SEARCH_HISTORY)
}

export const setSearchHistoryToLocalStorage = searchHistory => {
  setArrayToLocalStorage(STORAGE_KEYS.SEARCH_HISTORY, searchHistory)
}

export const getNewsletterEmailsFromLocalStorage = () => {
  return getArrayFromLocalStorage(STORAGE_KEYS.NEWSLETTER_EMAILS)
}

export const setNewsletterEmailsToLocalStorage = newsletterEmails => {
  setArrayToLocalStorage(STORAGE_KEYS.NEWSLETTER_EMAILS, newsletterEmails)
}
