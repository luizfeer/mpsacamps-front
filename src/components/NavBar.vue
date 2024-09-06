<template>
<nav class=" max-w-[1360px] mx-auto px-5 flex min-h-[64px] items-center gap-x-6 lg:gap-x-11 py-1 lg:min-h-[90px] lg:py-4">
            <!-- Logo -->
            <div class="shrink-0">
             <router-link to="/" class="navbar-brand">
              <q-img src="~assets/logo.png" class="w-28 m-2" />
            </router-link>

            </div>
            <!-- Logo / End -->

            <!-- Navigation (Desktop) -->
            <ul class="sm:invisible md:visible lg:gap-x-0 xl:gap-x-6 text-sm font-bold lg:flex">

                  <router-link
                v-for="(nav, index) in navLinks"
                :to="nav.id"
                :key="nav.id"
                class="font-poppins font-normal cursor-pointer group text-gray-900 dark:text-white relative inline-flex items-center gap-x-3 leading-10 px-3.5 xl:px-4.5 after:absolute after:top-[15px] after:left-0 after:bg-current-marker-dark after:transition-transform after:w-1.5 after:h-[9px] dark:after:bg-current-marker after:origin-left after:scale-x-100"
                :class="`
                    ${active === nav.title ? 'text-white' : 'text-dimWhite'}
                    ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}
                    `"
                    @click="active = nav.title"
                  >
                    {{nav.title}}
                </router-link>

            </ul>
            <!-- Navigation (Desktop) / End -->

            <!-- Header Controls -->
            <div class="flex ml-auto -mr-3 ">

              <div class="relative group">
                <a class="block py-4 px-2 xl:px-3" @click="loginWithGoogle">
                  <svg role="img" class="h-6 w-6 fill-gray-900 dark:fill-white">
                    <use href="~assets/sprite.svg#user"></use>
                  </svg>
                </a>

                <ul class=" sub-menu hidden absolute hover:opacity-100 hover:flex right-0 z-20  w-40 origin-top-right flex-col dark:bg-gray-700 py-3 text-sm font-bold opacity-0 shadow-2xl transition-all duration-300 group-hover:!flex group-hover:opacity-100">
                  <li class="px-5.5">
                    <a class="flex flex-row-reverse items-center justify-between py-1.5 text-white transition-colors hover:text-accent dark:hover:text-accent" href="_str1-account-info.html">
                      Personal Info
                    </a>
                  </li>
                  <li class="px-5.5">
                    <a class="flex flex-row-reverse items-center justify-between py-1.5 text-white transition-colors hover:text-accent dark:hover:text-accent" href="_str1-account-billing.html">
                      Billing Details
                    </a>
                  </li>
                  <li class="px-5.5">
                    <a class="flex flex-row-reverse items-center justify-between py-1.5 text-white transition-colors hover:text-accent dark:hover:text-accent" href="_str1-account-shipping.html">
                      Shipping Details
                    </a>
                  </li>
                  <li class="px-5.5">
                    <a class="flex flex-row-reverse items-center justify-between py-1.5 text-white transition-colors hover:text-accent dark:hover:text-accent" href="_str1-account-orders.html">
                      Orders
                    </a>
                  </li>
                  <li class="px-5.5">
                    <a class="flex flex-row-reverse items-center justify-between py-1.5 text-white transition-colors hover:text-accent dark:hover:text-accent" href="#.html">
                      Logout
                    </a>
                  </li>
                </ul>

              </div>

              <button class="js-menu-toggle -mr-2 inline-flex py-4 px-2 sm:px-3 lg:hidden xl:px-4">
                <svg role="img" class="js-menu-toggle-icon-open h-6 w-6 fill-gray-900 dark:fill-white">
                  <use xlink:href="assets/img/yt1/sprite.svg#menu"></use>
                </svg>
                <svg role="img" class="js-menu-toggle-icon-close hidden h-6 w-6 fill-gray-900 dark:fill-white">
                  <use xlink:href="assets/img/yt1/sprite.svg#menu-close"></use>
                </svg>
              </button>

            </div>
            <!-- Header Controls / End -->

          </nav>
<nav v-if="0" class="flex navbar text-h6 w-full text-weight-bold">
    <router-link to="/" class="navbar-brand">
      <q-img src="~assets/FEUPAM.png" class="w-16 m-2" />
    </router-link>

    <div class="list-none hidden-flex justify-center items-center flex-1">
        <router-link
        v-for="(nav, index) in navLinks"
        :to="nav.id"
        :key="nav.id"
        class="font-poppins font-normal cursor-pointer px-2"
        :class="`
            ${active === nav.title ? 'text-white' : 'text-dimWhite'}
            ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}
            `"
            @click="active = nav.title"
          >
            {{nav.title}}
        </router-link>

    </div>
     <div v-if="userStorage && !manutencao" class="m-4 relative flex-1 md:flex-none ">
      <div class=" border-purple-700 border-2 rounded-full w-[53px]">
        <q-avatar size="50px" round @click="toggleUser = !toggleUser" class="cursor-pointer">
          <q-img :src="userStorage.user.photoURL" />
        </q-avatar>
      </div>
       <div
          :class="!toggleUser ? 'hidden-tw' : 'flex'"
          class="z-[100] p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[240px] rounded-xl sidebar"
          >
            <div class="list-none flex justify-end items-start flex-1 flex-col">
                <router-link to="/profile" class="font-poppins font-medium cursor-pointer text-[16px] text-white mb-4">
                  <q-icon name="person" class="mr-2" />
                   {{ userStorage.user.displayName }}
                </router-link>
                 <!-- <div class="font-poppins font-medium cursor-pointer text-[16px] text-white mb-4">
                   Editar perfil
                </div> -->
                 <router-link to="/eventos" class="font-poppins font-medium cursor-pointer text-[16px] text-white mb-4">
                  <q-icon name="event_note" class="mr-2" />
                   Minhas inscrições
                </router-link>

                 <div @click="logout" class="font-poppins font-medium cursor-pointer text-[16px] text-white mb-4">
                  <q-icon name="logout" class="mr-2" />
                   Sair
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="!manutencao" class="-mt-6 cursor-pointer">
     <div  class="login-box mx-3" @click="loginWithGoogle" >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Login
      </div>
    </div>

    <div class="flex-hidden flex-1 justify-end items-center mr-4">
        <img
          :src="toggle ? close : menu"
          alt="menu"
          class="z-[100] w-[28px] h-[28px] object-contain"
          @click="toggle = !toggle"
        />
        <div
          :class="!toggle ? 'hidden-tw' : 'flex'"
          class="z-[100] p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar "
          >
            <div class="list-none flex justify-end items-start flex-1 flex-col">
                <router-link
                  :to="nav.id"
                  v-for="(nav, index) in navLinks" :key="nav.id"
                  class="font-poppins font-medium cursor-pointer text-[16px]"
                  :class="`${active === nav.title ? 'text-white' : 'text-dimWhite'} ${index === navLinks.length - 1 ? 'mb-0' : 'mb-4'}`"
                  @click=" active = nav.title"
                >
                    <a :href="nav.id">{{nav.title}}</a>
                </router-link>

            </div>

        </div>
    </div>
</nav>
<!-- dialog login -->

<q-dialog v-model="manutencaoModal" persistent>
  <q-card class="bg-black-gradient">
    <q-card-section class="flex justify-end items-center">

      <q-btn
        flat round icon="close"
        @click="manutencaoModal = false"

      />
    </q-card-section>
    <q-card-section class="text-center">
      <span class=" text-xl">Desculpe o transtorno, estamos em manutenção. Tente novamente mais tarde.</span>
    </q-card-section>
  </q-card>
</q-dialog>

</template>

<script>
import { ref, onMounted, nextTick } from 'vue'
import close from '../assets/close.svg'
import menu from '../assets/menu.svg'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'
import { firebase } from '../js/initFirebase.js'
import { api } from 'boot/axios'
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth'
export default {

  // import ref
  setup () {
    const store = useUserStore()
    const { userStorage } = storeToRefs(store)
    const modalLogin = ref(false)
    const active = ref('Home')
    const toggle = ref(false)
    const toggleUser = ref(false)
    const manutencao = ref(false)
    const manutencaoModal = ref(false)
    const navLinks = [
      {
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
      // {
      //   id: 'https://api.whatsapp.com/send?phone=5535999819980&text=Ol%C3%A1%2C%20preciso%20de%20ajuda',
      //   title: 'Contato'
      // },
      {
        id: '/conferencia',
        title: 'Acampamento'
      }
      // {
      //   id: 'federalíderes',
      //   title: 'Federalideres'
      // }
    ]
    const loginWithGoogle = async () => {
      const provider = new firebase.auth.GoogleAuthProvider()
      if (isSafari()) {
        console.log('popup')
        firebase.auth().signInWithPopup(provider).then((result) => {
        // Código para lidar com o login bem-sucedido
          console.log('Usuário autenticado:', result)

          authUser(result)
        }).catch((error) => {
          console.log('Erro ao fazer login:', error)
          // Lidar com erros aqui
          console.log(error)
        })
      } else {
        console.log('redirect')

        firebase.auth().signInWithRedirect(provider)
      }
    }
    onMounted(async () => {
      manutencaoModal.value = manutencao.value
      await nextTick()
      const auth = getAuth()
      window.google.accounts.id.initialize({
        client_id: '285883089269-tdicogfirhbthvicgum5jqmmnmmph92m.apps.googleusercontent.com',
        callback: async (response) => {
          const credential = GoogleAuthProvider.credential(response.credential)
          try {
            const result = await signInWithCredential(auth, credential)
            console.log('Usuário logado com One Tap:', result.user)
            // Aqui você pode redirecionar o usuário ou fazer outra ação desejada
          } catch (error) {
            console.error('Erro ao fazer login com One Tap:', error)
          }
        },
        auto_select: true, // Esta opção ativa o login automático,
        theme: 'dark'
      })

      // Primeiramente, verifique o estado de autenticação
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log('Usuário autenticado:', user)
          authUser({ user })
        } else {
          console.log('Usuário não está autenticado.')
        }
      })

      // Depois, verifique o resultado do redirecionamento
      firebase.auth().getRedirectResult().then(async (result) => {
        if (result.credential) {
          // Este dá acesso ao token de acesso do Google, se necessário
          const user = result.user
          console.log('Usuário autenticado pelo redirecionamento:', user)
          await nextTick()
          authUser(result)
        }
      }).catch((error) => {
        console.error('Erro ao fazer login pelo redirecionamento:', error)
      })
      setTimeout(() => {
        if (!userStorage.value) {
          window.google.accounts.id.prompt() // Esta função exibe o One Tap prompt
        }
      }, 10000)
    })

    const authUser = (authResult) => {
      console.log('authUser', authResult)
      if (authResult.user.multiFactor) {
        api.defaults.headers.Authorization = authResult.user.multiFactor.user.accessToken
      }
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
      return true
      // const ua = navigator.userAgent.toLowerCase()
      // if (ua.indexOf('safari') !== -1) {
      //   if (ua.indexOf('chrome') > -1) {
      //     return false
      //   } else {
      //     return true
      //   }
      // }
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
      manutencao,
      manutencaoModal
    }
  }
}
</script>

<style lang="postcss" scoped>
.hidden-tw{
  @apply hidden
}
.hidden-flex{
  @apply sm:flex hidden
}
.flex-hidden{
  @apply sm:hidden flex
}

</style>
<style>

.login-box label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box:focus ~ label,
.login-box:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}

.login-box:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
              0 0 25px #03e9f4,
              0 0 50px #03e9f4,
              0 0 100px #03e9f4;
}

.login-box span {
  position: absolute;
  display: block;
}

.login-box span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}

.login-box span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}

.login-box span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}

.login-box span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
}
</style>
