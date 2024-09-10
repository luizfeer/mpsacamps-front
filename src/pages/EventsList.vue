<template>
<NavBar />

<q-page v-if="userStorage?.user" class="px-4 md:mx-auto container z-10 overflow-hidden">
  <SvgIcon name="BottomWave" class="z-[0] absolute mt-[-s22rem] rotate-[190deg]" />

    <div id="inscricoes" class="flex justify-between flex-col px-10 py-12 rounded-[20px] md:mr-10 sm:mr-5 mr-0 my-5">
      <h1  class="z-30 font-poppins font-semibold text-2xl text-white xs:leading-[76.8px] leading-[66.8px] w-full">
        <q-icon name="event_note" class="mr-2" />
               Diárias Federa2024
            </h1>
        <div class="z-30 my-28 font-poppins flex justify-center gap-10 flex-wrap">
          <router-link to="/inscricao/dia1" class="carda">
          <q-card class="my-card hover:brightness-150 p-5  bg-slate-600 bg-opacity-10 rounded-xl flex flex-col items-center">
            <!-- <q-img src="~assets/federa/1.webp" class="rounded-lg w-full" /> -->
             <q-card-section class="min-h-[300px]">
               <h2 class="font-bold text-lg">Quinta - 30/05</h2>
                <p>08:00 - Horario de chegada - Café da Manhã</p>
                <p>09:00 - Pregação 1 (Andréa Vargas)</p>
                <!-- <p>11:00 - Pequeno Grupo</p> -->
                <p>12:30 - Almoço</p>
                <p>13:45 - Equipe Social/Esportes</p>
                <p>16:00 - Livre</p>
                <p>18:30 - Jantar</p>
                <p>19:45 - Abertura Noite + Louvor</p>
                <p>20:30 - Pregação 2 (Andréa Vargas)</p>
                <p>22:00 - Noite Suco do Brasil</p>
                <p>00:00 - Fim da programação para visitantes </p>
             </q-card-section>
                <div>
               <q-btn label="Inscrever" rounded class="py-2 px-6" color="blue" />
              </div>
          </q-card>
          </router-link>
          <router-link to="/inscricao/dia2" class="carda" >
          <q-card class="my-card hover:brightness-150 p-5  bg-slate-600 bg-opacity-10 rounded-xl flex flex-col items-center">
            <!-- <q-img src="~assets/federa/3.webp" class="rounded-lg w-full" /> -->
              <q-card-section class="min-h-[300px]">
                <h2 class="font-bold text-lg">Sexta - 31/05</h2>
                <p>08:00 - Horario de chegada - Café da Manhã</p>
                <p>09:00 - Pregação 3 (Andréa Vargas)</p>
                <!-- <p>11:00 - Foto Oficial + Pequenos Grupos</p> -->
                <p>12:30 - Almoço</p>
                <!-- <p>13:30 - Reunião Líderes de PG</p> -->
                <p>14:30 - Equipe Social/Esportes</p>
                <p>16:00 - Livre</p>
                <p>18:30 - Jantar</p>
                <p>20:30 - Pregação 4 (Pastor Lucas Machado)</p>
                <p>22:00 - Noite dos Talentos</p>
                <p>00:00 - Fim da programação para visitantes </p>

                </q-card-section>
                 <div>
               <q-btn label="Inscrever" rounded class="py-2 px-6" color="blue" />
              </div>
          </q-card>
          </router-link>
          <router-link to="/inscricao/dia3" class="carda" >
            <q-card class="my-card hover:brightness-150 p-5  bg-slate-600 bg-opacity-10 rounded-xl flex flex-col items-center">
              <!-- <q-img src="~assets/federa/2.webp" class="rounded-lg w-full" /> -->
              <q-card-section class="min-h-[300px]">
                <h2 class="font-bold text-lg">Sábado - 01/06</h2>
                <p>08:00 - Horario de chegada - Café da Manhã</p>
                <p>09:00 - Pregação 5 (Pastor Lucas Machado)</p>
                <!-- <p>11:00 - Pequeno Grupo</p> -->
                <p>12:30 - Almoço</p>
                <p>13:45 - Equipe Social/Esportes</p>
                <p>16:00 - Livre</p>

                <p>18:30 - Jantar</p>
                <p>20:30 - Encerramento (Pastor Lucas Machado)</p>
                <p>22:00 - Projeto SOLA</p>
                <!-- <p>23:00 - Livre</p> -->
                <p>00:00 - Fim da programação para visitantes </p>

              </q-card-section>
               <div>
               <q-btn label="Inscrever" rounded class="py-2 px-6" color="blue" />
              </div>
            </q-card>
          </router-link>

        </div>

        <div class="bg-blue-700 border border-blue-500 text-white px-4 py-3 rounded relative bg-opacity-10 mt-4" role="alert">
          <strong class="font-bold">Aviso</strong>
          <span class="block sm:inline">Você deve comprar as diarias individualmente.</span>

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
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'inscricoesView',
  components: {
    NavBar,
    SvgIcon,
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
