import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Test from '../views/Test.vue'

const routes = [
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
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
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [{
      path: 'table',
      name: 'table',
      components: {
        graphics: () => import('../views/Table.vue')
      }
    },{
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
  history: createWebHistory(process.env.BASE_URL),
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
