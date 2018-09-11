import Vue from 'vue'
import Router from 'vue-router'
// import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import LogoutPage from '../pages/LogoutPage.vue'
import SignUpPage from '../pages/SignUpPage.vue'
import SettingsPage from '../pages/SettingsPage.vue'
import NotesPage from '../pages/NotesPage.vue'
import NotesDeletePage from '../pages/NotesDeletePage.vue'
import NoteAddPage from '../pages/NoteAddPage.vue'
import NoteEditPage from '../pages/NoteEditPage.vue'
import { auth } from '../api/firebase'

Vue.use(Router)

const baseRoutes = [
  {
    path: '*',
    redirect: '/notes'
  },
  {
    path: '/',
    redirect: '/notes'
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: HomePage
  // },
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
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/notes',
    name: 'notes',
    component: NotesPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/notes-delete',
    name: 'notes-delete',
    component: NotesDeletePage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/note-add',
    name: 'note-add',
    component: NoteAddPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/note-edit/:noteId',
    name: 'note-edit',
    component: NoteEditPage,
    meta: {
      requiresAuth: true
    }
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

  // ****************** Debug Routes *************************
  // console.log(to.path)
  // if (requiresAuth) console.log('requiresAuth: True')
  // if (currentUser) console.log('currentUser: True')
  // **********************************************************

  if (requiresAuth && !currentUser) next('login')
  else if (currentUser && to.name === 'login') next('notes')
  else next()
})

export default router
