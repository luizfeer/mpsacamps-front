<template>
<NavBar />
<!-- <div class="absolute z-[0] w-[50%] h-[50%] right-[0%] top-[40%] purple__gradient"></div> -->

<q-page class="max-w-[1360px] mx-auto px-5 container pt-10 z-10">
  <div class="pt-10">
    <div class="container">
        <div class="grid grid-cols-12 gap-x-5 md:gap-x-6 lg:gap-x-7.5 gap-y-16">
            <div class="col-span-full md:col-span-8 md:pr-[38px] lg:pr-[50px] xl:pr-[70px]">
                <div class="mb-10 md:mb-12 lg:mb-16 xl:mb-[72px]">
                    <h3 class="text-xl font-bold tracking-tight text-gray-900 before:text-accent before:content-['.'] dark:text-white sm:text-1.5xl md:text-2xl lg:leading-none lg:text-[32px]">
                        MPS Acamps 2024!
                    </h3>
                </div>
                <figure class="relative mb-6 md:mb-8 lg:mb-10 xl:mb-12 ">
                  <q-img src="~assets/imgs/bgacamps.webp" class="h-[300px]"></q-img>
                </figure>
                <div class="[&_p]:mb-[2em]">
                    <p>O MPS Acamps será um evento incrível para jovens que buscam um encontro profundo com Deus, repleto de momentos de reflexão, comunhão e diversão. Com diversas atividades, pregações e muito mais, será uma oportunidade única para fortalecer a fé e criar memórias inesquecíveis.</p>
                    <p>Os acampantes terão a chance de participar de atividades ao ar livre, momentos de louvor e orações, e desfrutar de um tempo especial com amigos e líderes. Não perca essa chance de recarregar as energias espirituais e se conectar de uma forma mais profunda com sua fé.</p>
                </div>
                <div class="pt-5 lg:pt-9 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7.5 lg:max-w-xl">
                    <router-link to="/inscricao/mpsacamps" class="inline-flex text-center font-bold leading-none transition-colors uppercase justify-center gap-x-3 py-4 px-4 md:py-[18px] lg:px-8 text-sm text-white bg-green-900 hover:bg-green-600/90 flex-1">Fazer inscrição</router-link>
                    <a :href="googleCalendarLink()" target="_blank" class="inline-flex text-center font-bold leading-none transition-colors uppercase justify-center gap-x-3 py-4 px-4 md:py-[18px] lg:px-8 text-sm bg-blue-900 hover:bg-accent/90 flex-1">Adicionar ao Google Calendar</a>
                </div>
            </div>
            <div class="col-span-full md:col-span-4">
                <div class="mb-10 md:mb-12 lg:mb-16 xl:mb-[72px]">
                    <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-1.5xl md:text-2xl lg:leading-none lg:text-[32px]">Detalhes do Evento</h3>
                </div>
                <dl class="mb-8 flex flex-col gap-y-3.5 font-medium md:mb-10 lg:mb-12">
                    <div class="flex flex-wrap justify-between">
                        <dt class="text-gray-100 opacity-60">Data</dt>
                        <dd class="[&_a]:text-accent [&_a]:hover:text-gray-900 [&_a]:dark:hover:text-white">14 a 17 de novembro, 2023</dd>
                    </div>
                    <div class="flex flex-wrap justify-between">
                        <dt class="text-gray-100 opacity-60">Check-in</dt>
                        <dd class="[&_a]:text-accent [&_a]:hover:text-gray-900 [&_a]:dark:hover:text-white">14 de novembro, às 17h</dd>
                    </div>
                    <div class="flex flex-wrap justify-between">
                        <dt class="text-gray-100 opacity-60">Check-out</dt>
                        <dd class="[&_a]:text-accent [&_a]:hover:text-gray-900 [&_a]:dark:hover:text-white">17 de novembro, às 9h</dd>
                    </div>
                    <div class="flex flex-wrap justify-between">
                        <dt class="text-gray-100 opacity-60">Organizador</dt>
                        <dd class="[&_a]:text-accent [&_a]:hover:text-gray-900 [&_a]:dark:hover:text-white">MPS Acamps</dd>
                    </div>
                    <div class="flex flex-wrap justify-between">
                        <dt class="text-gray-100 opacity-60">Custo</dt>
                        <dd class="[&_a]:text-accent [&_a]:hover:text-gray-900 [&_a]:dark:hover:text-white">R$180,00</dd>
                    </div>
                    <div class="flex flex-wrap justify-between">
                        <dt class="text-gray-100 opacity-60">Local</dt>
                        <dd class="[&_a]:text-accent [&_a]:hover:text-gray-900 [&_a]:dark:hover:text-white">Acampamento Betel, Alpinópolis - MG, 37940-000</dd>
                    </div>
                </dl>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14917.106269510534!2d-46.3534550846558!3d-20.82053551777253!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b69aa5461bd779%3A0x4a5f2e9434f185c4!2sAcampamento%20Betel!5e0!3m2!1spt-BR!2sbr!4v1726074999050!5m2!1spt-BR!2sbr"  height="450" style="filter:grayscale(100%) invert(92%) contrast(83%); border:0; width: 100%;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    </div>
</div>

</q-page>

</template>

<script>
import {
  defineComponent,
  onMounted,
  ref
} from 'vue'
import NavBar from 'src/components/NavBar.vue'
import {
  api
} from 'boot/axios'
export default defineComponent({
  name: 'IndexPage',
  components: {
    NavBar
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
    const event = {
      title: 'MPS Acamps',
      startDate: '20241114T170000Z', // Formato: AAAAMMDDTHHMMSSZ (UTC)
      endDate: '20241117T090000Z', // Formato: AAAAMMDDTHHMMSSZ (UTC)
      details: 'MPSAcamps no Acampamento Betel, Alpinópolis - MG.',
      location: 'Acampamento Betel, Alpinópolis - MG, 37940-000'
    }
    const googleCalendarLink = () => {
      const { title, startDate, endDate, details, location } = event
      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        title
      )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
        details
      )}&location=${encodeURIComponent(location)}&sf=true&output=xml`
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
      googleCalendarLink

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
