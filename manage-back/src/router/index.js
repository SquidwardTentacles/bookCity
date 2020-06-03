import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [
      {
        path: '/home/index',
        name: '添加书籍',
        component: () => import(/* webpackChunkName: "about" */ '../views/sub-view/index.vue')
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

export default router
