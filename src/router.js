import Vue from 'vue'
import Router from 'vue-router'

import { locale } from '@/i18n'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:locale?',
      component: () =>
        import(/* webpackChunkName: 'layouts/auth' */ '@/layouts/Auth.vue'),
      children: [
        {
          name: 'login',
          path: '',
          component: () =>
            import(/* webpackChunkName: 'views/login' */ '@/views/Login.vue')
        },
        {
          name: 'sign-up',
          path: ''
        },
        {
          name: 'reset-password',
          path: ''
        }
      ]
    },
    {
      name: 'other',
      path: '*',
      redirect: {
        name: 'login'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.params.locale) {
    to.params.locale = locale
    return next(to)
  }
  return next()
})

export default router
