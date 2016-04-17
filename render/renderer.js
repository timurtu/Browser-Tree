/**
 * Created by timur on 4/17/16.
 */

const go = document.getElementById('go')
const goForm = document.getElementById('go-form')
const urlBar = document.getElementById('urlbar')
const webView = document.getElementById('webview')

console.log('dom loading...')

webView.addEventListener('dom-ready', () => {

  console.log('dom loaded!')

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


