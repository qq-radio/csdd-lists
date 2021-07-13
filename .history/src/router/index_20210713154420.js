import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/editUser',
    name: 'editUser',
    component:() => import(/* webpackChunkName: "about" */ '../components/EditUser.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [{
      path: 'table',
      name: 'table',
      components: {
        table: () => import('../components/Table.vue')
      }
    }, {
      path: 'graphics',
      name: 'graphics',
      components: {
        graphics: () => import('../components/Graphics.vue')
      }
    }, {
      path: 'more',
      name: 'more',
      components: {
        more: () => import('../components/More.vue')
      }
    }]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(
  (to, from, next) => {
    let token = sessionStorage.getItem('authorization')
    if (!token) {
      if (to.path !== '/login') {
        return next({ path: '/login' });
      } else {
        next();
      }
    }
    next();
  }
)

export default router
