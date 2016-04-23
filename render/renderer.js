/**
 * Created by timur on 4/17/16.
 */

const go = document.getElementById('go')
const goForm = document.getElementById('go-form')
const urlBar = document.getElementById('urlbar')

const views = document.getElementById('views')
const tabs = document.getElementById('tabs')

let currentView
let currentURL
let currentTab

/**
 * Observe the current active view and set the URL of
 * the current active tab and urlbar accordingly.
 *
 * @type {MutationObserver} Observe the views div's children
 */
const viewObserver = new MutationObserver(viewChanges => {

  viewChanges.forEach((viewChanged) => {

    // If there's any views
    if (views.hasChildNodes()) {

      // Iterate through them
      Array.prototype.forEach.call(views.childNodes, (view, i) => {

        // If this view is the active one
        if (view.classList.contains('active')) {

          // Keep a reference to it
          currentView = view
          // And its URL
          currentURL = currentView.getAttribute('src')
          // Set it to the address bar
          urlBar.value = currentURL

          // If there's any tabs
          if (tabs.hasChildNodes()) {

            // If there's a tab that corresponds to this view
            if (tabs.childNodes.item(i)) {

              // Keep a reference to that tab
              currentTab = tabs.childNodes.item(i)

              // Detect web view

              var indicator = document.querySelector(".indicator");

              var loadstart = function() {
                indicator.innerText = "loading...";
              }
              var loadstop = function() {
                indicator.innerText = "";
              }
              
              currentView.addEventListener("did-start-loading", loadstart);
              currentView.addEventListener("did-stop-loading", loadstop);

              // Handle this tab's text length
              const textLength = 32
              if (currentURL.length > textLength) {
                currentTab.textContent = `${currentURL.slice(0, textLength)}...`
              } else {
                currentTab.textContent = currentURL
              }

            }
          }
        }
      })
    }
  })
})

// Actually observe the list of views
viewObserver.observe(views, {attributes: true, subtree: true})

// Load the URL in the address bar
go.onclick = () => {
  goToURL()
}
goForm.addEventListener('submit', (event) => {
  event.preventDefault()
  goToURL()
})

// Select all text when the address bar is clicked
urlBar.onclick = (event) => {
  event.target.select()
}


/**
 * Use the address bar's value to navigate to a new page
 * with the current view.
 */
function goToURL() {

  let url;

  // Handle the user not entering http
  if (urlBar.value.startsWith('http')) {
    url = urlBar.value
  } else {
    url = `http://${urlBar.value}`
  }

  // Electron method to load the URL
  currentView.loadURL(url)

  // Scroll to the top of the new page
  window.scrollTo(0, 0)
}
