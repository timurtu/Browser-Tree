/**
 * Created by timur on 4/17/16.
 */

const go = document.getElementById('go')
const goForm = document.getElementById('go-form')
const urlBar = document.getElementById('urlbar')
const webView = document.getElementById('webview')

/**
 * Make sure that the urlBar's content matches the currently
 * loaded web page.
 *
 * @type {MutationObserver} Observe the webview
 */
var webViewObserver = new MutationObserver(function(mutations) {

  mutations.forEach(function(mutation) {

    urlBar.value = mutation.target.src
  });
});

// configuration of the observer:
var config = { attributes: true };

// pass in the webView node, as well as the observer options
webViewObserver.observe(webView, config);

webView.addEventListener('dom-ready', () => {

  urlBar.value = webView.getURL()

  urlBar.ondblclick = (event) => {
    event.target.select()
  }

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

  webView.loadURL(url)
  window.scrollTo(0, 0)

}


