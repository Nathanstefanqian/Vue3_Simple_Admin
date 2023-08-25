import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: "goods",
        name: "goods",
        meta: {
          isShow: true,
          title: "商品列表"
        },
        component: () => import('../views/GoodsView.vue')
      },
      {
        path: "user",
        name: "user",
        meta: {
          isShow: true,
          title: "用户列表"
        },
        component: () => import('../views/UserView.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
