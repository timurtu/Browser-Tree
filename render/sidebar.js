/**
 * Created by timur on 4/17/16.
 */

const menuButton = document.getElementById('menu')
const sidebar = document.getElementById('sidebar')

menuButton.onclick = () => {
  openMenu()
}

function openMenu() {

  if(sidebar.className === 'show-sidebar') {
    sidebar.className = 'hide-sidebar'
    console.log('sidebar hidden!')
  } else {
    sidebar.className = 'show-sidebar'
    console.log('sidebar shown!')
  }

}
