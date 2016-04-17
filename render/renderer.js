/**
 * Created by timur on 4/17/16.
 */

const go = document.getElementById('go')
const goForm = document.getElementById('go-form')
const urlBar = document.getElementById('urlbar');
const webView = document.getElementsByClassName('webview')[0];

go.onclick = () => {
  goToUrl()
}

goForm.addEventListener('submit', (event) => {
  event.preventDefault()
  goToUrl()
})


function goToUrl() {
  if(webView.isLoading()) {
    loading()
  }
  webView.setAttribute('src', `http://${urlBar.value}`)
  window.scrollTo(0, 0)
}

function loading() {
  document.body.backgroundColor = 'black';
}
