/**
 * Created by timur on 4/17/16.
 */

const go = document.getElementById('go')
const goForm = document.getElementById('go-form')
const urlBar = document.getElementById('urlbar')

let activeTab = document.querySelector('.tab.active')
const views = document.getElementById('views')


/**
 * Make sure that the urlBar and active tab's content
 * matches the currently loaded web page.
 *
 * @type {MutationObserver} Observe the webview
 */
const webViewObserver = new MutationObserver((mutations) => {

  mutations.forEach((mutation) => {


    const source = mutation.target.src

    activeTab.textContent = source


  })
})


// configuration of the observer
const config = {attributes: true};

Array.prototype.forEach.call(views.childNodes, (view) => {

  console.log(view)

  view.addEventListener('dom-ready', () => {

    webViewObserver.observe(view, config);

    go.onclick = () => {

      goToURL(view)
    }

    goForm.addEventListener('submit', (event) => {

      event.preventDefault()
      goToURL(view)
    })

    //
    // // pass in the views node, as well as the observer options
    // urlBar.value = view.getURL()

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


