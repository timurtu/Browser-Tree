/**
 * Created by timur on 4/17/16.
 */

const menuButton = document.getElementById('menu')
const newtabButton = document.getElementById('newtab')
const sidebar = document.getElementById('sidebar')
const views = document.getElementById('views')
const tabList = document.getElementById('tabs')
const urlBar = document.getElementById('urlbar')

createTab('https://facebook.com')
createTab('https://twitter.com')
createTab('https://reddit.com')
createTab('https://youtube.com')
createTab('https://npmjs.com')
createTab('https://github.com')

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

  if (sidebar.className === 'show-sidebar') {

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
function createTab(page = 'https://google.com') {

  removeAllActive()

  // Create new tab
  const newTab = document.createElement('a')
  newTab.className = 'tab list-group-item active'
  newTab.textContent = page
  tabList.appendChild(newTab)

  const newView = document.createElement('webview')
  newView.setAttribute('src', page)
  urlBar.setAttribute('value', page)
  newView.className = 'view active'
  views.appendChild(newView)

  handleTabClick(newTab, newView)

  // toggleSidebar()

}

/**
 * Sets the clicked tab and corresponding view
 * to active.
 * @param newTab
 * @param newView
 */
function handleTabClick(newTab, newView) {


  newTab.onclick = () => {

    removeAllActive()

    newTab.classList.add('active')

    newView.classList.remove('hide')
    newView.classList.add('active')
  }

}


/**
 * Removes all active webviews and tabs
 */
function removeAllActive() {

  // Remove active tabs and views
  Array.prototype.forEach.call(tabList.childNodes, (tab, i) => {

    const view = views.childNodes.item(i)
    removeActive(view)
    view.classList.add('hide')
    removeActive(tab)
  })
}


/**
 * Remove the active class from an element
 */
function removeActive(element) {
  if (element.classList.contains('active')) {
    element.classList.remove('active')
  }
}
