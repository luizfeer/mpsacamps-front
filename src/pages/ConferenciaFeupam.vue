<template>
<FotoHeader />
<div class="absolute z-[0] w-[50%] h-[50%] right-[0%] top-[40%] purple__gradient"></div>

<q-page class="mx-auto container z-10">
    <CountDown class="-mt-10" v-show="!liberado" />
    <transition appear enter-active-class="animated bounceInDown" leave-active-class="animated flipOutY" :duration="1000">
        <q-page-container class="w-full mt-[-250px] lg:mt-[-350px] mb-2 " v-show="liberado">

                    <InfoEvent />

        </q-page-container>
    </transition>
  <div class="container mx-auto p-8 text-xl">
   <p class="mb-4">
                <span class="font-semibold">Data:</span> 21 setembro<br>
                <span class="font-semibold">Local:</span> IPB PASSOS<br>
                <span class="font-semibold">Valor:</span> R$ 50,00<br>
            </p>

            <div class="mb-4">
                <span class="font-semibold">Check-in:</span> A partir das 8h<br>
                <span class="font-semibold">Abertura:</span> 9h
            </div>

            <div class="mb-4">
                <p class="font-semibold">Incluso:</p>
                <ul class="list-disc list-inside">
                    <li>Lanche da tarde</li>
                </ul>
                <p>Almoço não incluso, porém faremos parceria com restaurantes para os conferencistas.</p>
            </div>

            <div class="mb-4">
                <h2 class="text-2xl font-semibold text-green-400 mb-2">Programação</h2>

                <div class="mb-4">
                    <h3 class="text-xl font-semibold text-green-300">Bloco 1 - Manhã</h3>
                    <ul class="list-disc list-inside">
                        <li>Banda FEUPAM</li>
                        <li>Yuri Pena - Redenção do Corpo e da Cultura</li>
                    </ul>
                </div>

                <div class="mb-4">
                    <h3 class="text-xl font-semibold text-green-300">Bloco 2 - Tarde</h3>
                    <ul class="list-disc list-inside">
                        <li>Banda FEUPAM</li>
                        <li>Vanessa Belmonte - Redenção do Tempo e Disciplinas Espirituais</li>
                    </ul>
                </div>

                <div class="mb-4">
                    <h3 class="text-xl font-semibold text-green-300">Bloco 3 - Encerramento</h3>
                    <ul class="list-disc list-inside">
                        <li>Miquéias Medeiros</li>
                    </ul>
                </div>
            </div>
    </div>

        <div class="mx-auto w-full flex items-center justify-center text-center p-10">
            <div class=" p-0 text-4xl w-full">
                <p class="mb-2 font-bold"> COMPARTILHE </p>
                <q-icon @click="shareFaceBook" name="facebook" size="50px" class=" px-2 cursor-pointer text-blue-500" />
                <q-icon @click="shareWhatsApp" name="whatsapp" size="50px" class=" px-2 cursor-pointer text-green-400" />
                <q-icon @click="shareTelegram" name="telegram" size="50px" class=" px-2 cursor-pointer text-purple-400" />

            </div>

        </div>
        <div
          loading="lazy"
          id="insta"
          data-mc-src="e1c88328-7727-4afc-b797-e42f6c558a46#null">
        </div>

        <!-- <q-dialog v-model="state.dialog.show">
      <q-card class="w-[600px] h-auto">
        <q-img
          spinner-color="white"
          :src="`https://image.tmdb.org/t/p/w500${state.dialog.data.backdrop_path}`"
          class="w-full"
        />

        <q-card>
          <q-card-section>
            <div class="flex justify-between q-mt-sm">
              <div class="text-h5">{{ state.dialog.data.title }}</div>
              <span class="movie-note text-subtitle2 flex flex-center">
                <q-icon :name="state.dialog.data.vote_average ? 'star' : 'star_border'"></q-icon>
                <span class="ml-1">{{ state.dialog.data.vote_average }}</span>
              </span>
            </div>
            <div class="text-md my-2">{{ state.dialog.data.overview }}</div>
            <div class="flex gap-2 mt-2">
              <span class="movie-note text-subtitle2 flex flex-center bg-gray-700">
                <q-icon name="language"></q-icon>
                <span class="uppercase ml-1">{{ state.dialog.data.original_language }}</span>
              </span>

              <span class="movie-note text-subtitle2 flex flex-center bg-gray-700">
                <q-icon name="movie"></q-icon>
                <span
                  class="ml-1"
                >{{ format(new Date(state.dialog.data.release_date), 'yyyy/MM/dd') }}</span>
              </span>
            </div>
          </q-card-section>
        </q-card>
      </q-card>
    </q-dialog> -->
        <!-- <div class="flex-center flex loading" v-intersection="onIntersection">
      <q-spinner-bars color="white" size="4em" />
    </div> -->

</q-page>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref
} from 'vue'
import {
  useQuasar
} from 'quasar'

import FotoHeader from 'src/components/FotoHeader.vue'

import InfoEvent from 'src/components/InfoEvent.vue'
import CountDown from 'src/components/CountDown.vue'

export default defineComponent({
  name: 'ConferenciaFeupam',
  components: {
    FotoHeader,
    InfoEvent,
    CountDown
  },

  setup () {
    const liberado = ref(false)
    const $q = useQuasar()
    // verifica a cada segundo se a data atual e superior new Date('Apr 03 2023 19:00:00 GMT-0300') para liberar,
    const verifyIsLiberado = () => {
      setInterval(() => {
        if (new Date() > new Date('Apr 09 2024 19:00:00 GMT-0300')) {
          liberado.value = true
          localStorage.setItem('federa2024', 'true')
        }
      }, 1000)
    }

    onMounted(() => {
      $q.dark.set(true)
      if (localStorage.getItem('federa2024') === 'true') {
        liberado.value = true
      } else {
        liberado.value = false
        verifyIsLiberado()
      }
    })
    onMounted(() => {
      const scriptElement = document.createElement('script')
      scriptElement.src = 'https://cdn2.woxo.tech/a.js#64da11940c76a76d97ac2815'
      scriptElement.async = true
      scriptElement.setAttribute('data-usrc', '')
      document.body.appendChild(scriptElement)
    })
    return {
      liberado,
      shareFaceBook () {
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href, 'facebook-share-dialog', 'width=800,height=600')
      },
      shareWhatsApp () {
        window.open('https://api.whatsapp.com/send?text=' + window.location.href, 'whatsapp-share-dialog', 'width=800,height=600')
      },
      shareTwitter () {
        window.open('https://twitter.com/intent/tweet?text=' + window.location.href, 'twitter-share-dialog', 'width=800,height=600')
      },
      shareTelegram () {
        window.open('https://telegram.me/share/url?url=' + window.location.href, 'telegram-share-dialog', 'width=800,height=600')
      }
    }
  }

  // setup () {
  //   const key = 'fb8e26c908ec4f585c6be0cc6e04c393'
  //   const $q = useQuasar()
  //   const responseTrendsMovies = ref([])
  //   const period = reactive('week')
  //   const state = reactive({
  //     page: 1,
  //     period: 'week',
  //     dialog: {
  //       show: false,
  //       movieData: {}
  //     }
  //   })

  //   const getData = async () => {
  //     await api.get(`/trending/movie/${state.period}?api_key=${key}&page=${state.page}&per_page=10`)
  //       .then((response) => {
  //         if (response.data) {
  //           console.log(response.data)
  //           responseTrendsMovies.value = [
  //             ...responseTrendsMovies.value,
  //             ...response.data.results
  //           ]
  //         }
  //       })
  //       .catch((err) => {
  //         let msg
  //         if (err.response) {
  //           msg = err.response.data.message
  //         } else {
  //           msg = 'Erro na conexão!'
  //         }
  //         $q.notify({
  //           color: 'negative',
  //           position: 'top',
  //           message: msg,
  //           icon: 'report_problem'
  //         })
  //       })
  //   }
  //   watch(() => state.page, () => {
  //     getData()
  //   })
  //   watch(() => state.period, () => {
  //     responseTrendsMovies.value = []
  //     state.page = 1
  //   })
  //   onBeforeMount(async () => {
  //     await getData()
  //   })
  //   return {
  //     responseTrendsMovies,
  //     period,
  //     state,
  //     getData,
  //     format,
  //     onIntersection (entry) {
  //       setTimeout(() => {
  //         state.page++
  //       }, 4 * 1000)
  //     }
  //   }
  // }

})
</script>

<style>
.abertura {
    text-shadow: 0 0 10px #000;
}
.css-6kluu6{
  display: none !important;
}

</style>
