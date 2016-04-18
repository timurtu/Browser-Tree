/**
 * Created by timur on 4/17/16.
 */

const go = document.getElementById('go')
const goForm = document.getElementById('go-form')
const urlBar = document.getElementById('urlbar')

let activeTab = document.querySelector('.tab.active')
let activeView = document.querySelector('.view.active')


/**
 * Make sure that the urlBar and active tab's content
 * matches the currently loaded web page.
 *
 * @type {MutationObserver} Observe the webview
 */
var webViewObserver = new MutationObserver((mutations) => {

  mutations.forEach((mutation) => {


    const source = mutation.target.src

    activeTab.textContent = source
    urlBar.value = source

    console.log(source)


    activeView = document.querySelector('.view.active')

  })
})



activeView.addEventListener('dom-ready', () => {


  // pass in the views node, as well as the observer options
  urlBar.value = activeView.getURL()

  // configuration of the observer:
  var config = {attributes: true};

  webViewObserver.observe(activeView, config);

  go.onclick = () => {
    goToURL(activeView)
  }

  goForm.addEventListener('submit', (event) => {
    event.preventDefault()
    goToURL(activeView)
  })

})

function goToURL(activeView) {

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


