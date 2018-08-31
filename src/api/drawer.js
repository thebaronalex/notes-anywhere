var _loggedInDrawer = [
  { href: 'home', router: true, title: 'Home', icon: 'home' },
  { href: 'about', router: true, title: 'About', icon: 'domain' },
  { href: 'logout', router: true, title: 'Logout', icon: 'person_outline' }
]

var _loggedoutDrawer = [
  { href: 'about', router: true, title: 'About', icon: 'domain' },
  { href: 'login', router: true, title: 'Login', icon: 'person' }
]

export default {
  getLoggedInDrawerItems (cb) {
    setTimeout(() => cb(_loggedInDrawer), 100)
  },
  getLoggedOutDrawerItems (cb) {
    setTimeout(() => cb(_loggedoutDrawer), 100)
  }
}
