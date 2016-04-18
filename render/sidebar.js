/**
 * Created by timur on 4/17/16.
 */

const menuButton = document.getElementById('menu')
const newtabButton = document.getElementById('newtab')
const sidebar = document.getElementById('sidebar')
const views = document.getElementById('views')
const tabList = document.getElementById('tabs')
const urlBar = document.getElementById('urlbar')

let homepage

menuButton.onclick = () => {
  toggleSidebar()
}

newtabButton.onclick = () => {
  createTab()
}

/**
 * Hide or show the sidebar by changing it's
 * css class with a transition.
 */
function toggleSidebar() {

  if(sidebar.className === 'show-sidebar') {

    sidebar.className = 'hide-sidebar'

  } else {

    sidebar.className = 'show-sidebar'
  }

}

/**
 * Creates a new tab and webview from the
 * user's set home page, and append it to
 * the list of tabs in the sidebar.
 */
function createTab() {

  homepage = `https://google.com`;

  // Remove active tabs and views
  Array.prototype.forEach.call(tabList.childNodes, (tab) => {
    removeActive(tab)
  })

  Array.prototype.forEach.call(views.childNodes, (view) => {
    removeActive(view)
    view.classList.add('hide')
  })

  // Create new tab
  const newTab = document.createElement('a')
  newTab.className = 'tab list-group-item active'
  newTab.textContent = homepage
  tabList.appendChild(newTab)

  const newView = document.createElement('webview')
  newView.setAttribute('src', homepage)
  urlBar.value = homepage
  newView.className = 'view active'
  views.appendChild(newView)

  toggleSidebar()

}

/**
 * Remove the active class from an element
 */
function removeActive(element) {
  if(element.classList.contains('active')) {
    element.classList.remove('active')
  }
}