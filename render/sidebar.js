/**
 * Created by timur on 4/17/16.
 */

const menuButton = document.getElementById('menu')
const newtabButton = document.getElementById('newtab')
const sidebar = document.getElementById('sidebar')
const views = document.getElementById('views')
const tabList = document.getElementById('tabs')
const urlBar = document.getElementById('urlbar')
const resizeBar = document.getElementById('resizebar')

import fs from 'fs'


/**
 * Read tabs from a JSON file
 */
fs.readFile('./res/tabs.json', (err, data) => {

  if (err) throw err;

  const tabsFromFile = JSON.parse(data)

  tabsFromFile.forEach((tabFromFile) => {
    createTab(tabFromFile)
  })
})

menuButton.onclick = () => {
  toggleSidebar()
}

newtabButton.onclick = () => {
  createTab()
}

let resizingSidebar

document.onmousemove = event => {
  if (resizingSidebar) {
    sidebar.style.width = `${event.clientX}px`
    resizeBar.style.left = `${event.clientX}px`
    sidebar.style.transition = 'none'
    resizeBar.style.transition = 'none'
  }
}
document.onmouseup = event => {

  resizingSidebar = false
  sidebar.style.transition = '.3s ease all'
  resizeBar.style.transition = '.3s ease all'

  let min = 300
  let max = 800

  if (sidebar.offsetWidth < 200) {
    toggleSidebar()
    sidebar.style.width = `${min}px`
    resizeBar.style.left = `${min}px`
  } else if (sidebar.offsetWidth > max) {
    sidebar.style.width = `${max}px`
    resizeBar.style.left = `${max}px`

  }

}

resizeBar.onmousedown = event => {
  resizingSidebar = true
}


/**
 * Hide or show the sidebar by changing it's
 * css class with a transition.
 */
function toggleSidebar() {


  if (sidebar.className == 'show-sidebar') {

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

}

/**
 * Sets the clicked tab and corresponding view
 * to active.
 *
 * @param newTab
 * @param newView
 */
function handleTabClick(newTab, newView) {

  newTab.onclick = event => {

    // Clicked on the x button
    if (event.clientX > newTab.offsetWidth - 22) {
      closeTab(newTab, newView)
    }
    else if (event.clientX < 15) {
      console.log(event.target)
    }
    else {
      setToActive(newTab, newView)
    }

  }

}

/**
 * Closes the tab passed in and removes the corresponding
 * webview.
 *
 * @param tab
 */
function closeTab(tab, view) {
  tabList.removeChild(tab)
  views.removeChild(view)
}


/**
 * Sets a tab and view's classes to active
 *
 * @param tab
 * @param view
 */
function setToActive(tab, view) {

  removeAllActive()

  tab.classList.add('active')

  view.classList.remove('hide')
  view.classList.add('active')

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
