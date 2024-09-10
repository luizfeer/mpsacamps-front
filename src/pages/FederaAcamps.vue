<template>
<FotoHeader />
<div class="absolute z-[0] w-[50%] h-[50%] right-[0%] top-[40%] purple__gradient"></div>

<q-page class="mx-auto container z-10">
    <CountDown class="-mt-20" v-show="!liberado" :time="timeData.inicio_inscricoes" />
    <transition appear enter-active-class="animated bounceInDown" leave-active-class="animated flipOutY" :duration="1000">
        <q-page-container class="w-full -mt-[8rem] mb-2 fl " v-show="liberado">

                    <!-- <div class="text-h3 text-center mr-3 mb-16">Preletores</div>

        <div class="text-h3 text-center mr-3 mb-4">Inscrição</div>
        <FormInscricao/> -->
                    <InfoEvent />

        </q-page-container>
    </transition>

    <div class="block relative w-full px-6">

            <h1 class=" text-center md:text-left mt-24 z-30 font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full">
                <q-icon name="people" class="mr-2" />
                Preletores
            </h1>
            <div class="row gap-5 mt-2 justify-around p-5">
                <div class="col-12 col-md-5">
                    <!-- <q-img src="~assets/federa/andrea.webp" class="w-full" /> -->
                </div>
                <div class="col-12 col-md-5">

                    <!-- <q-img src="~assets/federa/lucas.webp" class="w-full" /> -->
                </div>

            </div>
            <SvgIcon name="BottomWave" class="-z-0 absolute mt-6 rotate-[190deg]" />

            <div class="row col-12 px-5 md:px-16 relative w-full m-0 items-end my-20 lg:my-36">
                <div class="relative h-full font-bold md:mr-[-7rem] z-10 flex flex-col-reverse max-w-[30rem]">
                    <div class="text-center ">
                        <span class="font-poppins text-3xl  mt-10 abertura">
                            Quais são suas expectativas para o
                        </span>
                        <span class="font-poppins text-5xl text-center abertura">Federa2024?</span>
                        <CardsAnimados class="text-left font-normal mt-20 md:ml-20" />
                    </div>
                </div>

                <!-- <q-img src="~assets/federa/fliperamastudio.webp" class="col-12 col-sm-6 mt-9 sm:mt-0 opacity-75" /> -->

            </div>
           <div class="w-full bg-gray-900 bg-opacity-30 border-2 border-[#13003052] shadow-lg rounded-lg p-4 md:p-10 mt-24">
            <h1 class="font-poppins font-semibold text-2xl md:text-5xl text-white">
                FEDERACAMPS
            </h1>
            <div class="font-poppins font-normal text-base text-dimWhite text-justify mt-8">
                <p>
                    O FederAcamps é um acampamento organizado, desde 2016, no feriado de Corpus Christ, no Acampamento Betel com o propósito de englobar adolescentes e jovens.
                </p>
                <p class="mt-2">
                    O FederAcamps é fundamento em cima de alguns objetivos que norteiam todo o seu desenvolvimento. São eles:
                </p>

                <ul class="mt-2 list-disc ml-6">
                    <li><b>Unidade</b>: fortalecer a unidade do acampante na Igreja local, dando a ele o entendimento real da importância e responsabilidade com a sua Igreja.</li>
                    <li><b>Comunhão</b>: através da unidade da Igreja local, desenvolver entre os acampantes a comunhão do entre as Igrejas.</li>
                    <li><b>Vocação</b>: despertar no acampante a sua vocação e serviço no Reino. Demonstrando que todos temos uma vocação e a desenvolvemos para a glória do Senhor e expansão do Reino.</li>
                    <li><b>Missão</b>: desenvolver a responsabilidade com a obra missionária. Precisamos nos envolver com missões e despertar no acampante a responsabilidade com Missões.</li>
                    <li><b>Discipulado</b>: conclamar o acampante a uma vida de responsabilidade. Isto começa no entendimento que somos discípulos de Cristo Jesus.</li>
                    <li><b>Serviço</b>: servir o Rei e ao Reino é um privilégio. Por isto, entendemos que precisamos fortalecer os adolescentes e jovens para servir o Reino de Deus e não ser meramente ouvintes.</li>
                </ul>
                <p class="mt-2">

                  No FederAcamps zelamos por uma pregação expositiva da Escritura e por louvores que condiz com o que cremos e professamos. Toda a nossa programação, é montada com temor e teremos diante de Deus e a nossa equipe é formada de discípulos autênticos do Senhor Jesus Cristo!
                </p>

            </div>
        </div>

        </div>

        <div class="mx-auto w-full flex items-center justify-center text-center p-10">
            <div class=" p-0 text-4xl w-full">
                <p class="mb-2 font-bold"> COMPARTILHE </p>
                <q-icon @click="shareFaceBook" name="facebook" size="50px" class=" px-2 cursor-pointer text-blue-500" />
                <q-icon @click="shareWhatsApp" name="whatsapp" size="50px" class=" px-2 cursor-pointer text-green-400" />
                <q-icon @click="shareTelegram" name="telegram" size="50px" class=" px-2 cursor-pointer text-blue-400" />

            </div>

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

import FotoHeader from 'src/components/FotoHeader.vue'
import SvgIcon from 'src/components/SvgIcon.vue'
import CardsAnimados from 'src/components/CardsAnimados.vue'
import InfoEvent from 'src/components/InfoEvent.vue'
import CountDown from 'src/components/CountDown.vue'
import { api } from 'boot/axios'
export default defineComponent({
  name: 'IndexPage',
  components: {
    FotoHeader,
    SvgIcon,
    CardsAnimados,
    InfoEvent,
    CountDown
  },

  setup () {
    const liberado = ref(false)
    const timeData = ref('')
    // verifica a cada segundo se a data atual e superior new Date('Apr 03 2023 19:00:00 GMT-0300') para liberar,
    const verifyIsLiberado = () => {
      api.get('/time').then((response) => {
        if (response.data) {
          timeData.value = response.data
        }
      })

      setInterval(() => {
        if (new Date() > new Date(timeData.value.inicio_inscricoes)) {
          liberado.value = true
          localStorage.setItem('federa2024e', 'true')
        }
      }, 1000)
    }

    onMounted(() => {
      if (localStorage.getItem('federa2024e') === 'true') {
        liberado.value = true
      } else {
        liberado.value = false
        verifyIsLiberado()
      }
    })
    return {
      liberado,
      timeData,
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

<style scoped>
.abertura {
    text-shadow: 0 0 10px #000;
}
</style>
