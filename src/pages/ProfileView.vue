<template>
<NavBar />

<q-page v-if="userStorage" class="px-4 md:mx-auto container z-10 overflow-hidden">
  <SvgIcon name="BottomWave" class="z-[0] absolute mt-[-s22rem] rotate-[190deg]" />
    <section class="flex flex-nowrap my-20">
        <div class="flex items-center w-full p-10">
          <q-avatar size="100px" class="mr-10">
            <q-img fit="contain" :src="userStorage.picture"></q-img>
          </q-avatar>
          <div class="flex flex-col">
            <div class="text-h3">{{ userStorage.name }}</div>
            <div class="text-h5 text-dimWhite">{{ userStorage.email }}</div>
          </div>
        </div>
    </section>

    <div id="token" class="flex justify-between flex-col px-10 py-12 rounded-[20px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
      <h1  class="z-30 font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full">
        <q-icon name="event_note" class="mr-2" />
               Perfil:
            </h1>
        <!-- <p class=" z-30 font-poppins font-normal text-[18px] leading-[32.4px] text-white my-10">
          <q-input type="textarea" v-model="token" dense outlined class="bg-dark text-white" label="Token" />
        </p> -->
         <div class="flex row items-start z-20">
          <div class="gap-4 flex">

          <router-link to="/eventos" class="flex items-center justify-center  px-3 py-2 rounded-md bg-purple-900 bg-opacity-90 text-xl">
            <q-icon name="event_note" class="mr-2" />
            Suas inscrições
          </router-link>
          <router-link to="/atualizar-dados" class="flex items-center justify-center  px-3 py-2 rounded-md bg-purple-900 bg-opacity-90 text-xl">
            <q-icon name="event_note" class="mr-2" />
            Atualizar seus dados
          </router-link>
          <!-- <a href="/termo-menor.pdf" class="flex items-center justify-center  px-3 py-2 rounded-md bg-purple-900 bg-opacity-90 text-xl" target="_blank" rel="noopener noreferrer">
            <q-icon name="cloud_download" class="mr-2" />
            Autorização para menores de idade
          </a> -->

        </div>

        </div>

        </div>

 <FooterSite />
</q-page>
<!-- <div class="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" ></div> -->
<!-- <div class="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" ></div> -->
<div class="absolute z-[0] w-[50%] h-[50%] right-[0%] top-[40%] blue__gradient"></div>
</template>

<script>
import {
  defineComponent,
  onMounted
} from 'vue'

import NavBar from 'src/components/NavBar.vue'
import SvgIcon from 'src/components/SvgIcon.vue'
import FooterSite from 'src/components/FooterSite.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/user'
import { storeToRefs } from 'pinia'
export default defineComponent({
  name: 'IndexPage',
  components: {
    NavBar,
    SvgIcon,
    FooterSite
  },
  setup () {
    const router = useRouter()
    const store = useUserStore()
    const { userStorage, loading } = storeToRefs(store)
    onMounted(() => {
      if (!userStorage) {
        router.push('/login')
      }
    })
    return {
      userStorage,
      loading

    }
  }

})
</script>

<style scoped>
</style>
