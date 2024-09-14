<template>
<nav class="fixed bottom-0 w-full z-[100]" v-if="!manutencao">
    <router-link to="/" :class="`${route.path === '/' ? 'active' : ''}`" @click="active = 'home'">
        <svg viewBox="0 0 100 100">
            <g transform="translate(10 5) scale(0.8 0.9)">
                <path d="M 0 30 v 70 h 100 v -70 l -50 -30 z" stroke="currentColor" stroke-width="10" fill="none" stroke-linejoin="round" stroke-linecap="round" />
            </g>
        </svg>
        <span>
            Inicio
        </span>
    </router-link>
    <template v-if="!userStorage">
      <router-link to="/eventos" :class="`${route.path === '/eventos' ? 'active' : ''}`" @click="loginWithGoogle">
      <svg w viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.91 14.6924C18.91 15.9824 19.97 17.0324 21.26 17.0324C21.26 20.7824 20.32 21.7224 16.57 21.7224H7.19C3.44 21.7224 2.5 20.7824 2.5 17.0324V16.5724C3.79 16.5724 4.85 15.5124 4.85 14.2224C4.85 12.9324 3.79 11.8724 2.5 11.8724V11.4124C2.51 7.66241 3.44 6.72241 7.19 6.72241H16.56C20.31 6.72241 21.25 7.66241 21.25 11.4124V12.3524C19.96 12.3524 18.91 13.3924 18.91 14.6924Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.2111 6.7225H7.12109L10.0511 3.7925C12.4411 1.4025 13.6411 1.4025 16.0311 3.7925L16.6311 4.3925C16.0011 5.0225 15.8511 5.9525 16.2111 6.7225Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.87891 6.72266L9.87891 21.7227" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 5"/>
      </svg>
        <span>
            Eventos
        </span>
    </router-link>
    <router-link to="/profile" :class="`${route.path === '/profile' ? 'active' : ''}`" @click="loginWithGoogle">
        <svg viewBox="0 0 100 100">
            <g transform="translate(5 5) scale(0.9 0.9)">
                <circle cx="50" cy="35" r="18" stroke="currentColor" stroke-width="10" fill="none" />
                <rect x="15" y="75" width="70" height="50" rx="25" stroke="currentColor" stroke-width="10" fill="none" />
            </g>
        </svg>
        <span>
            Perfil
        </span>
    </router-link>
    </template>
    <template v-else>

    <router-link to="/eventos" :class="`${route.path === '/eventos' ? 'active' : ''}`" @click="active = 'eventos'">
      <svg w viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.91 14.6924C18.91 15.9824 19.97 17.0324 21.26 17.0324C21.26 20.7824 20.32 21.7224 16.57 21.7224H7.19C3.44 21.7224 2.5 20.7824 2.5 17.0324V16.5724C3.79 16.5724 4.85 15.5124 4.85 14.2224C4.85 12.9324 3.79 11.8724 2.5 11.8724V11.4124C2.51 7.66241 3.44 6.72241 7.19 6.72241H16.56C20.31 6.72241 21.25 7.66241 21.25 11.4124V12.3524C19.96 12.3524 18.91 13.3924 18.91 14.6924Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.2111 6.7225H7.12109L10.0511 3.7925C12.4411 1.4025 13.6411 1.4025 16.0311 3.7925L16.6311 4.3925C16.0011 5.0225 15.8511 5.9525 16.2111 6.7225Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.87891 6.72266L9.87891 21.7227" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 5"/>
      </svg>
        <span>
            Eventos
        </span>
    </router-link>

    <!-- <router-link to="#" :class="`${active === 'home' ? 'active' : ''}`" @click="active = 'home'">
        <svg viewBox="0 0 100 100">
            <g transform="translate(5 5) scale(0.9 0.9)">
                <circle cx="45" cy="38" r="38" stroke="currentColor" stroke-width="10" fill="none" />
                <line x1="66" y1="65" x2="100" y2="100" stroke="currentColor" stroke-width="10" />
            </g>
        </svg>
        <span>
            Search
        </span>
    </router-link> -->

    <router-link to="/profile" :class="`${route.path === '/profile' ? 'active' : ''}`" @click="active = 'perfil'">
        <svg viewBox="0 0 100 100">
            <g transform="translate(5 5) scale(0.9 0.9)">
                <circle cx="50" cy="35" r="18" stroke="currentColor" stroke-width="10" fill="none" />
                <rect x="15" y="75" width="70" height="50" rx="25" stroke="currentColor" stroke-width="10" fill="none" />
            </g>
        </svg>
        <span>
            Perfil
        </span>
    </router-link>
  </template>

</nav>
</template>

<script>
import {
  ref,
  onMounted
} from 'vue'
import close from '../assets/close.svg'
import menu from '../assets/menu.svg'
import { useRoute } from 'vue-router'
import {
  storeToRefs
} from 'pinia'
import {
  useUserStore
} from 'stores/user'
import {
  firebase
} from '../js/initFirebase.js'
import {
  api
} from 'boot/axios'
export default {

  // import ref
  setup () {
    const store = useUserStore()
    const {
      userStorage
    } = storeToRefs(store)
    const modalLogin = ref(false)
    const route = useRoute()
    const active = ref('home')
    const toggle = ref(false)
    const toggleUser = ref(false)
    const navLinks = [{
      id: '/',
      title: 'Home'
    },
    {
      id: '/#quemsomos',
      title: 'Quem somos'
    },
    // {
    //   id: '/tutoria',
    //   title: 'Tutoria'
    // },
    {
      id: '/#contato',
      title: 'Contato'
    },
    {
      id: '/acamps',
      title: 'Acamps'
    }
      // {
      //   id: 'federalíderes',
      //   title: 'Federalideres'
      // }
    ]
    const loginWithGoogle = async () => {
      const provider = new firebase.auth.GoogleAuthProvider()
      if (isSafari()) {
        firebase.auth().signInWithPopup(provider).then((result) => {
          // Código para lidar com o login bem-sucedido
          console.log('Usuário autenticado:', result)
          authUser(result)
        }).catch((error) => {
          // Lidar com erros aqui
          console.log('nnao aut', error)
          console.log(error)
        })
      } else {
        firebase.auth().signInWithRedirect(provider)
        console.log('Usuário autenticado:', firebase.auth().currentUser)
      }
    }
    onMounted(async () => {
      // await nextTick()
      // firebase.auth().getRedirectResult().then(async (result) => {
      //   if (result.credential) {
      //     // Este dá acesso ao token de acesso do Google, se necessário
      //     const user = result.user
      //     console.log('Usuário autenticado:', user)
      //     await nextTick()
      //     authUser(result)
      //   }
      //   // As informações do usuário logado

      //   // Sua lógica após o login bem-sucedido aqui
      // }).catch((error) => {
      //   console.error('Erro ao fazer login:', error)
      //   // Sua lógica para lidar com erros aqui
      // })
      // await nextTick()

      // firebase.auth().onAuthStateChanged(user => {
      //   if (user) {
      //     console.log('Usuário autenticado:', user.multiFactor)

      //     authUser(user.multiFactor)
      //   } else {
      //     console.log('Usuário não está autenticado.')
      //   }
      // })
    })

    const authUser = (authResult) => {
      api.defaults.headers.Authorization = authResult.user.accessToken
      store.setUserStorage(authResult)
      modalLogin.value = false
    }
    const logout = () => {
      try {
        firebase.auth().signOut()
          .then(() => {
            console.log('Usuário deslogado com sucesso')
            // Redirecionar para a página de login ou executar outras ações
          })
          .catch((error) => {
            console.error('Erro ao deslogar:', error)
          })

        userStorage.value = null
        // handleSignOut()
        window.location.href = '/'
        // make quasar  alert 'Sessão expirada'
        this.$q.notify({
          message: 'Sessão expirada, realize login novamente',
          color: 'negative',
          position: 'top',
          timeout: 2000
        })
        // window.location.href = '/'
      } catch (e) {
        console.log(e)
      }
    }
    const isSafari = () => {
      const ua = navigator.userAgent.toLowerCase()
      if (ua.indexOf('safari') !== -1) {
        if (ua.indexOf('chrome') > -1) {
          return false
        } else {
          return true
        }
      }
    }

    return {
      active,
      toggle,
      navLinks,
      close,
      menu,
      userStorage,
      toggleUser,
      logout,
      modalLogin,
      authUser,
      loginWithGoogle,
      isSafari,
      route,
      manutencao: ref(false)
    }
  }
}
</script>

<style scoped>

nav {
    display: flex;
    background: #02000cd8;
    justify-content: center;
    /* considerable whitespace surrounding the navigation's items */
    padding: 1rem;
    border-radius: 30px 30px 0 0;
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1);
    margin-top: 10rem;
}

/* remove default style and slightly separate the anchor links from one another */
a {
    color: inherit;
    text-decoration: none;
    margin: 0 0.2rem;
    /* display the svg icon and span elements side by side, vertically aligned */
    display: flex;
    align-items: center;
    /* include padding for the background applied on the active item */
    padding: 0.75rem 1.25rem;
    border-radius: 30px;
    /* position relative for the pseudo element */
    position: relative;
    /* custom properties for the colors picked up by the elements when clicked (and updated for each link in the script) */
    --hover-bg: #210a5ae3;
    --hover-c: #f8f5ffbb;
}

/* include considerable negative margin to have the svg icon overlapping with the span element */
a svg {
    margin-right: -2.5rem;
    width: 28px;
    height: 28px;
    pointer-events: none;
    /* transition for the change in margin */
    transition: margin 0.2s ease-out;
}

/* by default hide the span element */
a span {
    opacity: 0;
    visibility: hidden;
    font-size: 0.9rem;
    margin-left: 0.9rem;
}

/* include with a pseudo element relative to the anchor link a circle, with a fixed with and height */
a:before {
    position: absolute;
    content: "";
    top: 50%;
    left: 0;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    /* positioned to the left of the anchor link and scaled to 0 */
    transform: translate(0%, -50%) scale(0);
    visibility: visible;
    opacity: 1;
}

/* when active */
/* specify the colors dictated by the custom properties */
a.active {
    background: var(--hover-bg);
    color: var(--hover-c);
}

/* using the color specified by the then updated custom property show the circle of the pseudo element increasing its size and highlighting it momentarily */
a.active:before {
    background: var(--hover-c);
    opacity: 0;
    visibility: hidden;
    transform: translate(0%, -50%) scale(2);
    /* transition only when the class is applied */
    transition: all 0.4s ease-out;
}

/* remove the margin applied to the svg to make it overlay atop the anchor link */
a.active svg {
    margin-right: 0;
}

/* show the span element */
a.active span {
    visibility: visible;
    opacity: 1;
    transition: all 0.2s ease-out;
}

/* on smaller viewports show the navigation bar on the side, attached to the left of the screen */
@media (max-width: 300px) {
    nav {
        flex-direction: column;
        justify-self: start;
        border-radius: 0 30px 30px 0;
        padding: 2rem 1.15rem 2rem 0.75rem;
    }

    /* change the margin separating the anchor link elements now dividing the elements vertically */
    nav a {
        margin: 0.5rem 0;
    }

    /* remove the negative margin from the svg elements, as the width is to be taken in full */
    nav svg {
        margin: 0;
    }
}
</style>
