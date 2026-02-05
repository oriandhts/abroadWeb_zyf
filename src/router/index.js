import { createRouter, createMemoryHistory } from 'vue-router'
// import IndexView from '../views/index.vue'
// import HomePage from '../views/system/homepage.vue'
// import Service from '../views/system/service.vue'
// import Choose from '../views/system/choose.vue'
// import Programme from '../views/system/programme.vue'
// import Documents from '../views/system/documents.vue'
// import Positioning from '../views/system/positioning.vue'
// import Login from '../views/login.vue'
// make router a extra varible to better use it
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/index.vue'),
    redirect: '/homePage',
    children: [
      {
        path: 'homePage',
        name: 'homepage',
        component: () => import('../views/system/homepage.vue'),
      },
      {
        path: 'service',
        name: 'service',
        component: () => import('../views/system/service.vue'),
      },
      {
        path: 'choose',
        name: 'choose',
        // component: () => import('../views/system/choose.vue'),
        component: '../views/system/choose.vue',
      },
      {
        path: 'programme',
        name: 'programme',
        component: () => import('../views/system/programme.vue'),
      },
      {
        path: 'documents',
        name: 'documents',
        component: () => import('../views/system/documents.vue'),
      },
      {
        path: 'positioning',
        name: 'positioning',
        component: () => import('../views/system/positioning.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
})

export default router
