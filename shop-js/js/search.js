import { getSearchHistoryFromLocalStorage, setSearchHistoryToLocalStorage } from './storage.js'

const SEARCH_BREAKPOINT = 992
const SEARCH_OPEN_CLASS = 'header__search--open'

export const initHeaderSearch = () => {
  const searchForm = document.querySelector('.header__search')
  const searchButton = document.querySelector('.header__search-submit')
  const searchClearButton = document.querySelector('.header__search-clear')
  const searchInput = document.querySelector('.header__search-input')

  if (!searchForm || !searchButton || !searchClearButton || !searchInput) return

  const searchMediaQuery = window.matchMedia(`(max-width: ${SEARCH_BREAKPOINT}px)`)
  const searchHistory = getSearchHistoryFromLocalStorage()

  const isMobileSearch = () => searchMediaQuery.matches
  const isSearchOpen = () => searchForm.classList.contains(SEARCH_OPEN_CLASS)

  const updateSearchAvailability = () => {
    if (!isMobileSearch() || isSearchOpen()) {
      searchInput.removeAttribute('tabindex')
      return
    }

    searchInput.setAttribute('tabindex', '-1')
  }

  const openSearch = () => {
    searchForm.classList.add(SEARCH_OPEN_CLASS)
    searchButton.setAttribute('aria-expanded', 'true')
    updateSearchAvailability()

    requestAnimationFrame(() => {
      searchInput.focus()
    })
  }

  const closeSearch = (shouldReturnFocus = false) => {
    searchForm.classList.remove(SEARCH_OPEN_CLASS)
    searchButton.setAttribute('aria-expanded', 'false')
    updateSearchAvailability()

    if (shouldReturnFocus) {
      searchButton.focus()
    }
  }

  const saveSearch = () => {
    const searchText = searchInput.value.trim()

    if (!searchText) {
      searchInput.focus()
      return false
    }

    searchHistory.push(searchText)
    setSearchHistoryToLocalStorage(searchHistory)
    return true
  }

  const submitSearch = () => {
    const isSaved = saveSearch()

    if (!isSaved) return

    if (isMobileSearch()) {
      closeSearch()
    }
  }

  searchButton.setAttribute('aria-expanded', 'false')
  searchButton.setAttribute('aria-controls', searchInput.id)
  updateSearchAvailability()

  searchButton.addEventListener('click', event => {
    event.preventDefault()

    if (!isMobileSearch()) {
      submitSearch()
      return
    }

    if (!isSearchOpen()) {
      openSearch()
      return
    }

    submitSearch()
  })

  searchForm.addEventListener('submit', event => {
    event.preventDefault()

    if (isMobileSearch() && !isSearchOpen()) {
      openSearch()
      return
    }

    submitSearch()
  })

  searchClearButton.addEventListener('click', () => {
    searchInput.value = ''
    searchInput.focus()
  })

  document.addEventListener('click', event => {
    if (!isMobileSearch() || !isSearchOpen()) return
    if (!(event.target instanceof Element)) return
    if (event.target.closest('.header__search')) return

    closeSearch()
  })

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return
    if (!isMobileSearch() || !isSearchOpen()) return

    event.preventDefault()
    closeSearch(true)
  })

  const onSearchMediaQueryChange = () => {
    closeSearch()
    updateSearchAvailability()
  }

  if (typeof searchMediaQuery.addEventListener === 'function') {
    searchMediaQuery.addEventListener('change', onSearchMediaQueryChange)
  } else {
    searchMediaQuery.addListener(onSearchMediaQueryChange)
  }
}
