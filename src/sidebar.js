/**
 * Created by timur on 4/17/16.
 */

import fs from 'fs'

const menuButton = document.getElementById('menu')
const newtabButton = document.getElementById('newtab')
const sidebar = document.getElementById('sidebar')
const views = document.getElementById('views')
const tabList = document.getElementById('tabs')
const urlBar = document.getElementById('urlbar')
const resizeBar = document.getElementById('resizebar')

// import {remote} from 'electron'

// const app = remote.app

const tabsFile = './res/tabs.json'

/**
 * Save tab
 */
// app.on('window-all-closed', () => {
//   fs.writeFile(tabsFile, JSON.stringify(tabsList), (err) => {
//     if (err) throw err
//   })
// })

function saveTabs() {
  
 
  // fs.writeFile(tabsFile, , err => {
  //   if(err) throw err
  // })
}

saveTabs()

/**
 * Read tabs from a JSON file
 */
fs.readFile(tabsFile, (err, data) => {
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

// Boolean reference to whether or not the sidebar is resizing
let sidebarIsResizing
/**
 *
 * Fires an event whenever the mouse moves anywhere on the page.
 *
 * @param event MouseEvent
 */
document.onmousemove = event => {

  if (sidebarIsResizing) {

    event.preventDefault()

    // Set the sidebar's width to the mouse x location
    sidebar.style.width = `${event.clientX}px`

    // Same with the resizebar except it's location
    resizeBar.style.left = `${event.clientX}px`

    // Stop using the transition for sidebar resizing
    sidebar.style.transition = 'none'
    resizeBar.style.transition = 'none'


    // console.log(tabList)
    resizeTabNames()
  }

}

/**
 * Set each tab's URL text length to the width of the sidebar
 */
function resizeTabNames() {

  const textLength = sidebar.offsetWidth / 10

  Array.prototype.forEach.call(tabsDiv.childNodes, (tab, i) => {

    let view = views.childNodes.item(i)

    if (view) {

      if (view.src.length > textLength) {
        tab.textContent = `${view.src.slice(0, textLength)}...`
      } else {
        tab.textContent = view.src
      }

    }

  })

}

/**
 * Fires an event when the left mouse button is let go.
 *
 * @param event MouseEvent
 */
document.onmouseup = event => {

  // You can't resize the sidebar if the mouse is up
  sidebarIsResizing = false

  // Bring those smooth transitions back to the sidebar
  sidebar.style.transition = '.3s ease all'
  resizeBar.style.transition = '.3s ease all'

  // Minimum and maximum sizes of the sidebar.
  let min = 250
  let max = 800


  // Don't let the user make the sidebar smaller than this value.
  if (sidebar.offsetWidth < min) {

    // Hide it when they do
    toggleSidebar()

    // Set these values back to the minimum to handle the smaller
    // value the user tried to put and after toggling the sidebar
    // so the transition works as expected.
    sidebar.style.width = '20em'
    resizeBar.style.left = `20em`

  } else if (sidebar.offsetWidth > max) {

    // Set the sidebar to the max when the user tries to go
    // above it. I like this effect.
    sidebar.style.width = `${max}px`
    resizeBar.style.left = `${max}px`
  }

}

/**
 * Fires an event when the mouse is down on the
 * tiny resizebar.
 *
 * @param event MouseEvent
 */
resizeBar.onmousedown = event => {

  // The sidebar starts resizing. This needs the above mousemove
  // event handling because this event only fires once when the
  // mouse button is clicked.
  sidebarIsResizing = true
}


/**
 * Hide or show the sidebar by changing it's
 * css class with a transition.
 */
function toggleSidebar() {

  if (sidebar.className == 'show-sidebar') {
    sidebar.className = 'hide-sidebar'
  } else {
    resizeTabNames()
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
  tabsDiv.appendChild(newTab)

  const newView = document.createElement('webview')
  newView.setAttribute('src', page)
  urlBar.setAttribute('value', page)
  newView.className = 'view active'
  views.appendChild(newView)

  handleTabClick(newTab, newView)
  resizeTabNames()

}

/**
 * Sets the clicked tab and corresponding view
 * to active.
 *
 * @param newTab
 * @param newView
 */
function handleTabClick(newTab, newView) {

  const closeButtonWidth = 22

  // Handle each tab's clicks separately
  newTab.onclick = event => {

    // Clicked on the x button so close the tab
    if (event.clientX > newTab.offsetWidth - closeButtonWidth) {

      // Handle top tab
      if (newTab.previousSibling) {

        // If you close the current tab, set the one before it to active
        if (newTab.classList.contains('active')) {

          // Tab above this one
          setToActive(newTab.previousSibling, newView.previousSibling)
        }
      }

      closeTab(newTab, newView)
    }

    // Tree View goes here
    else if (event.clientX < 15) {
      console.log(event.target)
    }

    // If not closing the tab or selecting more options
    // Then set it to the active tab
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
  tabsDiv.removeChild(tab)
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
  Array.prototype.forEach.call(tabsDiv.childNodes, (tab, i) => {

    const view = viewsDiv.childNodes.item(i)
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
