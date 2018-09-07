
// Icons:  https://material.io/tools/icons/?style=baseline

var _loggedInDrawer = [
  { id: 1, href: 'notes', router: true, title: 'My Notes', icon: 'notes' },
  { id: 2, href: 'settings', router: true, title: 'Settings', icon: 'settings' },
  { id: 3, href: 'logout', router: true, title: 'Logout', icon: 'person_outline' },
  { id: 4, href: 'about', router: true, title: 'About', icon: 'info' }
]

var _loggedoutDrawer = [
  { id: 1, href: 'about', router: true, title: 'About', icon: 'info' },
  { id: 2, href: 'login', router: true, title: 'Login', icon: 'person' }
]

export default {
  getLoggedInDrawerItems (cb) {
    setTimeout(() => cb(_loggedInDrawer), 100)
  },
  getLoggedOutDrawerItems (cb) {
    setTimeout(() => cb(_loggedoutDrawer), 100)
  }
}
