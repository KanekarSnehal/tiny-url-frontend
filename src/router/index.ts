import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignupView.vue'
import LoginViewVue from '../views/LoginView.vue'

const router = createRouter({
  linkActiveClass: 'bg-blue-100 font-bold border-indigo-500',
  linkExactActiveClass: 'border-indigo-700',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signup',
      component: SignUpView,
      meta: { hideHeaderAndSidebar: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginViewVue,
      meta: { hideHeaderAndSidebar: true }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/links',
      name: 'link',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LinkView.vue')
    },
    {
      path: '/qrcodes',
      name: 'qrcodes',
      component: () => import('../views/QRView.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
  ]
})

export default router
