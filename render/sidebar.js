/**
 * Created by timur on 4/17/16.
 */

const menuButton = document.getElementById('menu')
const newtabButton = document.getElementById('newtab')
const sidebar = document.getElementById('sidebar')
const views = document.getElementById('views')
const tabs = document.getElementById('tabs').childNodes

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
 * Create a new tab from the user's set home
 * page, and append it to the list of tabs
 * in the sidebar.
 */
function createTab() {
  console.log(tabs);
}
