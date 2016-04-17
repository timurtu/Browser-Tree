/**
 * Created by timur on 4/17/16.
 */

const menuButton = document.getElementById('menu')
const sidebar = document.getElementById('sidebar')
const views = document.getElementById('views')

menuButton.onclick = () => {
  toggleSidebar()
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
 * Hide the menu if the screen is clicked.
 */
views.onclick = () => {

  console.log('clicked web page')

  if(sidebar.className === 'show-sidebar') {

    console.log('hide sidebar')

    sidebar.className = 'hide-sidebar'
  }
}