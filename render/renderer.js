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
  webView.setAttribute('src', `http://${urlBar.value}`)
}
