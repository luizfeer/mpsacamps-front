<template>
<NavBar />

<q-page v-if="userStorage?.user" class="px-4 md:mx-auto container z-10 overflow-hidden">

    <div id="inscricoes" class="flex justify-between flex-col px-10 py-12 rounded-[20px] md:mr-10 sm:mr-5 mr-0 my-5">
      <h1  class="z-30 font-poppins font-semibold text-2xl text-white xs:leading-[76.8px] leading-[66.8px] w-full">
        <q-icon name="event_note" class="mr-2" />
               Diárias MPSAcamps
            </h1>
        <div class="z-30 my-28 font-poppins flex justify-center gap-10 flex-wrap">
          <router-link to="/inscricao/dia15" class="carda">
          <q-card class="my-card hover:brightness-150 p-5  bg-slate-600 bg-opacity-10 rounded-xl flex flex-col items-center">
            <!-- <q-img src="~assets/federa/1.webp" class="rounded-lg w-full" /> -->
             <q-card-section class="min-h-[300px]">
               <h2 class="font-bold text-lg">Sexta - 15/11</h2>
                <p>Checkin - 8:30h</p>
                <p>Café - 8:45h</p>
                <p>Culto - 9:30h</p>
                <p>PG - 11:30h</p>
                <p>Almoço - 12:15h</p>
                <p>Esporte e Vangea - 13:30h</p>
                <p>Banho - 17:00h</p>
                <p>Jantar - 19:00h</p>
                <p>Culto - 20:30h</p>
                <p>Social - 22:00h</p>
                <p>Checkout - 00:00h</p>
             </q-card-section>
                <div>
               <q-btn label="Inscrever" rounded class="py-2 px-6" color="purple" />
              </div>
          </q-card>
          </router-link>
          <router-link to="/inscricao/dia16" class="carda" >
          <q-card class="my-card hover:brightness-150 p-5  bg-slate-600 bg-opacity-10 rounded-xl flex flex-col items-center">
            <!-- <q-img src="~assets/federa/3.webp" class="rounded-lg w-full" /> -->
              <q-card-section class="min-h-[300px]">
                <h2 class="font-bold text-lg">Sábado - 16/11</h2>
                  <p>Checkin - 8:30h</p>
                  <p>Café - 8:45h</p>
                  <p>Culto - 9:30h</p>
                  <p>PG - 11:30h</p>
                  <p>Almoço - 13:30h</p>
                  <p>Esporte - 13:30h</p>
                  <p>Banho - 17:00h</p>
                  <p>Jantar - 19:00h</p>
                  <p>Culto - 20:30h - Encerramento</p>
                  <p>PG Final - 22:30h</p>
                  <p>Social - 23:00h</p>
                  <p>Checkout - 3:00h</p>
                </q-card-section>
                 <div>
               <q-btn label="Inscrever" rounded class="py-2 px-6" color="purple" />
              </div>
          </q-card>
          </router-link>

        </div>

        <div class="bg-purple-700 border border-purple-500 text-white px-4 py-3 rounded relative bg-opacity-10 mt-4" role="alert">
          <strong class="font-bold">Aviso</strong>
          <span class="block sm:inline">Você deve comprar as diarias individualmente.</span>

        </div>

      </div>
 <FooterSite />

</q-page>
<q-page v-else class="flex flex-col items-center justify-center px-4 md:mx-auto container z-10 overflow-hidden">
  <div class="text-center">
    <h2 class="text-2xl font-bold mb-4">Faça login para comprar as diárias</h2>
    <p class="mb-6">Você precisa estar logado para visualizar e comprar as diárias do MPSAcamps.</p>
    <p>Clique no icone de usuario no topo da página para fazer login</p>
  </div>
</q-page>
</template>

<script>
import {
  defineComponent,
  onMounted

} from 'vue'

import NavBar from 'src/components/NavBar.vue'
import FooterSite from 'src/components/FooterSite.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/user'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'inscricoesView',
  components: {
    NavBar,
    FooterSite
  },
  setup () {
    const store = useUserStore()

    const { userStorage } = storeToRefs(store)

    const router = useRouter()
    const $q = useQuasar()

    // const interval = ref(null)
    onMounted(async () => {

    })
    // onUnmounted(() => {
    //   clearInterval(interval.value)
    // })

    return {
      userStorage,
      router,
      $q

    }
  }

})
</script>

<style scoped>
.carda {
  width: 100%;
  max-width: 400px;
  transition: all 0.3s;
  display: contents;
}
</style>
