import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LayoutView from '../views/LayoutView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: "page",
    redirect: "/home",
    component: LayoutView,
    children: [
      {
        path: "home",
        name: "home",
        meta: {
          isShow: true,
          title: "主页"
        },
        component: () => import('../views/HomeView.vue')
      },
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
      },
      {
        path: "role",
        name: "role",
        meta: {
          isShow: true,
          title: "角色列表"
        },
        component: () => import('../views/RoleView.vue')
      },
      {
        path: "authority",
        name: "authority",
        meta: {
          isShow: false,
          title: "权限列表"
        },
        component: () => import('../views/AuthorityView.vue')
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

router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem("token")
  if (!token && to.path !== '/login') {
    next('/login')
  }
  else {
    next()
  }
})

export default router
