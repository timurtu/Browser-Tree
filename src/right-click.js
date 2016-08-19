/**
 * Created by timur on 4/24/16.
 */

import {
  remote
} from 'electron'

const Menu = remote.Menu
const MenuItem = remote.MenuItem
let menu = new Menu()
let rightClickMenuItems = [
  {
    label: 'Back',
    click: event => {
      back()
    }
  },
  {
    label: 'Forward',
    click: event => {
      forward()
    }
  },
  {
    type: 'separator'
  }
]

rightClickMenuItems.forEach(menuItem => {
  menu.append(new MenuItem(menuItem))
})

window.addEventListener('contextmenu', (event) => {

  event.preventDefault()

  menu.popup(remote.getCurrentWindow())

}, false)
