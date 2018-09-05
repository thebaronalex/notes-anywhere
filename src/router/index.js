import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import SignUpPage from '../pages/SignUpPage.vue'
import LogoutPage from '../pages/LogoutPage.vue'
import { auth } from '../api/firebase'

Vue.use(Router)

const baseRoutes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutPage
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUpPage
  }
]

// const routes = baseRoutes.concat(messagesRoutes, peopleRoutes);
const routes = baseRoutes
const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  let currentUser = auth.currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else next()
})

export default router
