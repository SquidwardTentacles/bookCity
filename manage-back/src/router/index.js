import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import { Message } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [
      {
        path: '/home/index',
        name: '书籍列表',
        component: () => import(/* webpackChunkName: "about" */ '../views/sub-view/bookshelf.vue')
      },
      {
        path: '/home/classification',
        name: '编辑分类',
        component: () => import(/* webpackChunkName: "about" */ '../views/sub-view/classification.vue'),
        subMenu: [
          { title: '男频' },
          { title: '女频' },
          { title: '不限' }
        ]
      }
    ]
  },
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')

  }

]

const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userSesson = store.state.userSesson
  if (to.path !== '/') {
    if (!userSesson.account) {
      Message.error('请登录后进行操作')
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
