import { boot } from 'quasar/wrappers'
import axios from 'axios'
// import { refreshToken } from 'src/js/initFirebase'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const api = axios.create({ baseURL: 'https://feupam-backend.fly.dev' })
const api = axios.create({ baseURL: 'https://app-s3go7ufjia-uc.a.run.app/' })

api.defaults.headers.post['Content-Type'] = 'application/json'

const token = localStorage.getItem('token')
console.log(token)
if (token) {
  api.defaults.headers.Authorization = token
}

// api.interceptors.response.use(undefined, (error) => {
//   console.log(error)
//   if (error.response && error.response.status === 401 && error.response.data.message === 'Firebase ID token has expired. Get a fresh ID token from your client app and try again (auth/id-token-expired). See https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve an ID token.') {
//     refreshToken()
//     console.log('refreshed')
//   }
//   return Promise.reject(error)
// })

// add header token on localstorage

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // define header token

  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
