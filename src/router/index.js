import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import PostsManager from '@/components/PostsManager'
import OktaVue, { LoginCallback } from '@okta/okta-vue'
import { OktaAuth } from '@okta/okta-auth-js'

const oktaAuth = new OktaAuth({
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  clientId: '{yourClientId}',
  redirectUri: window.location.origin + '/callback',
  scopes: ['openid', 'profile', 'email']
})

Vue.use(Router)
Vue.use(OktaVue, { oktaAuth })

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/callback',
      component: LoginCallback
    },
    {
      path: '/posts-manager',
      name: 'PostsManager',
      component: PostsManager,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

export default router
