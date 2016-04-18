/**
 * Created by timur on 4/17/16.
 */

const go = document.getElementById('go')
const goForm = document.getElementById('go-form')
const urlBar = document.getElementById('urlbar')
const activeView = document.querySelector('.view.active')
const activeTab = document.querySelector('.tab.active')

/**
 * Make sure that the urlBar and active tab's content
 * matches the currently loaded web page.
 *
 * @type {MutationObserver} Observe the webview
 */
var webViewObserver = new MutationObserver(function (mutations) {

  mutations.forEach(function (mutation) {

    const source = mutation.target.src

    urlBar.value = source
    activeTab.textContent = source
  });
});

// configuration of the observer:
var config = {attributes: true};

// pass in the views node, as well as the observer options
webViewObserver.observe(activeView, config);

activeView.addEventListener('dom-ready', () => {

  urlBar.value = activeView.getURL()

  go.onclick = () => {
    goToURL()
  }

  goForm.addEventListener('submit', (event) => {
    event.preventDefault()
    goToURL()
  })

})

function goToURL() {

  let url;

  // Handle http
  if (urlBar.value.startsWith('http')) {
    url = urlBar.value
  } else {
    url = `http://${urlBar.value}`
  }

  activeView.loadURL(url)
  window.scrollTo(0, 0)

}


