/**
 * Created by timur on 4/17/16.
 */

const go = document.getElementById('go')
const goForm = document.getElementById('go-form')
const urlBar = document.getElementById('urlbar')

const viewsDiv = document.getElementById('views')
const tabsDiv = document.getElementById('tabs')

let currentView
let currentURL
let currentTab

/**
 * Observe the current active view and set the URL of
 * the current active tab and urlbar accordingly.
 *
 * @type {MutationObserver} Observe the webview div's children
 */
const webviewObserver = new MutationObserver(webviewMutations => {

  webviewMutations.forEach(() => {
    // If there's any webview
    if (viewsDiv.hasChildNodes()) {
      // Iterate through them
      Array.prototype.forEach.call(viewsDiv.childNodes, (view, i) => {

        // If this view is the active one
        if (view.classList.contains('active')) {
          // Keep a reference to it
          currentView = view
          // And its URL
          currentURL = currentView.getAttribute('src')
          // Set it to the address bar
          urlBar.value = currentURL

          // If there's any tabs
          if (tabsDiv.hasChildNodes()) {
            // If there's a tab that corresponds to this view
            if (tabsDiv.childNodes.item(i)) {
              // Keep a reference to that tab
              currentTab = tabsDiv.childNodes.item(i)
              resizeTabNames()
            }
          }
        }
      })
    }
  })
})

// Actually observe the list of webview
webviewObserver.observe(viewsDiv, {attributes: true, subtree: true})

// Load the URL in the address bar
go.addEventListener('click', goToURL)
goForm.addEventListener('submit', goToURL)

// Select all text when the address bar is clicked
urlBar.onclick = (event) => {
  event.target.select()
}


/**
 * Use the address bar's value to navigate to a new page
 * with the current view.
 */
function goToURL(event) {
  event.preventDefault()

  let url;

  const urlRegexp = /(?:\w*\.)\w+/;

  // Handle the user not entering http
  // if (urlBar.value.startsWith('http')) {
  if (urlRegexp.test(urlBar.value)) {

    if (urlBar.value.startsWith('http')) {

      url = urlBar.value
    } else {

      url = `http://${urlBar.value}`
    }
  }
  else {

    // Search google

    const words = urlBar.value.split(' ')
    let searchQuery

    if (words.length === 1) {
      searchQuery = words
    } else {
      searchQuery = words.join('+')
    }

    url = `https://www.google.com/?gws_rd=ssl#q=${searchQuery}`

  }

// Electron method to load the URL
  currentView.loadURL(url)

// Scroll to the top of the new page
  window.scrollTo(0, 0)
}
