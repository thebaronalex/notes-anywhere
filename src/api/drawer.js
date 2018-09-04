var _loggedInDrawer = [
  { id: 1, href: 'home', router: true, title: 'Home', icon: 'home' },
  { id: 2, href: 'about', router: true, title: 'About', icon: 'info' },
  { id: 3, href: 'logout', router: true, title: 'Logout', icon: 'person_outline' }
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
