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
        name: 'home/index',
        component: () => import(/* webpackChunkName: "about" */ '../views/sub-view/index.vue')
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
