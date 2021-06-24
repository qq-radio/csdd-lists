import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Test from '../views/Test.vue'

const routes = [
  {
    path: '/test',
    name: 'Test',
    component: Test,
    children: [{
      path: 'test_1',
      name: 'test_1',
      components: {
        test_1: () => import('../components/Test_1.vue')
      }
    }, {
      path: 'test_2',
      name: 'test_2',
      components: {
        test_2: () => import('../components/Test_2.vue')
      }
    }, {
      path: 'test_3',
      name: 'test_3',
      components: {
        test_3: () => import('../components/Test_3.vue')
      }
    }]
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
