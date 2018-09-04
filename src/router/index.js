import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import firebase from 'firebase/app'
// import 'firebase/auth'

import { auth } from '../api/firebase'
import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import ExamplePage from '../pages/ExamplePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import SignUpPage from '../pages/SignUpPage.vue'
import LogoutPage from '../pages/LogoutPage.vue'

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
    path: '/examples',
    name: 'examples',
    component: ExamplePage
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

  if (currentUser) {
    console.log(currentUser.email)
  } else {
    console.log('no user')
  }

  // console.log(to.name)

  if (requiresAuth && !currentUser) next('login')
  else next()
})

export default router
