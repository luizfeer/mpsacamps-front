import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { firebase } from '../js/initFirebase.js'
import { api } from 'boot/axios'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })
  Router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth) {
      try {
      // Espera pela confirmação de autenticação do Firebase.
        await new Promise((resolve, reject) => {
          const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe() // Desligar o ouvinte imediatamente.
            if (user) {
              resolve(user)
              api.defaults.headers.Authorization = user.multiFactor.user.accessToken
              console.log(user)
            } else {
              reject('No user')
            }
          }, reject)
        })

        // Se a promessa é resolvida, usuário está autenticado.
        next()
      } catch (error) {
      // Se a promessa é rejeitada, redirecionar para login.
        next('/login')
      }
    } else {
    // Se a rota não requer autenticação, prosseguir normalmente.
      next()
    }
  })

  return Router
})
