<template>
<NavBar />

<q-page class="px-4 md:mx-auto container z-10 font-poppins ">

    <Carousel :autoplay="10000" :wrap-around="true">
        <Slide v-for="slide in 7" :key="slide">
            <div class="carousel__item  bg-cover bg-center " v-if="slide===1" :style="{ backgroundImage: `url(${imagem1})`  }" >

             <!-- <div
                class="col-span-10 col-start-2 self-center md:col-span-5 lg:col-start-2 text-center md:text-left  [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]"
                >
                    <div class="md:-ml-2 xl:-ml-3">
                        <div class=" text-xl font-bold leading-none tracking-tighter text-white  transition-all">Segue a gente no </div>
                        <div class="-mt-[0.1em] translate-x-8 text-6xl font-bold leading-none tracking-tighter text-yellow-600">Insta</div>
                    </div>
                    <div class="mt-3 md:mt-1 xl:-mt-2.5 lg:pb-9 xl:pb-12">
                        <div class="mb-7 translate-y-4 text-base font-medium leading-8 text-white ">
                            Acompanhe nosso intagram para ficar por dentro de todas as novidades!
                        </div>
                        <a href="https://www.instagram.com/mpsacamps/" class="inline-flex text-center font-bold leading-none transition-colors uppercase justify-center gap-x-3 py-4 md:py-[21px] px-5 lg:px-10 text-white bg-social-twitch hover:bg-social-twitch/90 w-full lg:w-[75%] xl:w-[55%] translate-y-4 ">
                            Seguir

                        </a>
                    </div>

                </div> -->
            </div>
                <div v-else-if="slide===2" class="carousel__item  bg-cover bg-center" :style="{ backgroundImage: `url(${imagem2})` }">
                  <!-- <div class="col-span-10 col-start-2 self-center md:col-span-5 lg:col-start-2 text-center md:text-left bg-cover bg-center [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]"
                  >
                      <div class="px-6 text-center">

                        <div class="mb-1 flex flex-wrap justify-center gap-1 text-accent lg:mb-2 font-bold uppercase">
                          <div>Nosso canal no youtbe</div>
                        </div>

                        <h2 class="mb-6 text-4xl font-bold leading-none tracking-tighter sm:text-5xl md:mb-8 md:text-6xl md:leading-none lg:text-7xl lg:mb-12 lg:leading-none text-white xl:text-[74px]">
                          <a href="_str1-single.html" class="hover:opacity-80 transition-opacity duration-300">
                            Video de anuncio do MPSAcamps.
                          </a>
                        </h2>

                        <a href="#" class="inline-flex text-center font-bold leading-none transition-colors uppercase justify-center gap-x-3 py-4 px-4 md:py-[18px] lg:px-8 text-sm text-white bg-primary hover:bg-primary/90">
                          Assista o video

                        </a>
                      </div>
                    </div> -->

                </div>
                <div v-else-if="slide===3" class="carousel__item  bg-cover bg-center" :style="{ backgroundImage: `url(${imagem3})` }"></div>
                <div v-else-if="slide===4" class="carousel__item  bg-cover bg-center" :style="{ backgroundImage: `url(${imagem4})` }"></div>
                <div v-else-if="slide===5" class="carousel__item  bg-cover bg-center" :style="{ backgroundImage: `url(${imagem5})` }"></div>
                <div v-else-if="slide===6" class="carousel__item  bg-cover bg-center" :style="{ backgroundImage: `url(${imagem6})` }"></div>
                <div v-else-if="slide===7" class="carousel__item  bg-cover bg-center" :style="{ backgroundImage: `url(${imagem7})` }"></div>
                <div v-else-if="slide===8" class="carousel__item  bg-cover bg-center" :style="{ backgroundImage: `url(${imagem8})` }"></div>

        </Slide>

        <template #addons>
            <Pagination />
        </template>
    </Carousel>
    <div class="mx-auto max-w-[1360px] mt-16 md:px-5 pb-20 md:pb-24 lg:pb-[150px] md:pt-24">
        <div class="relative min-h-[220px] bg-cover bg-no-repeat" :style="{ backgroundImage: `url(${countdownBg})` }">
            <div class="container relative z-10 text-white">
                <div class="grid grid-cols-12 gap-x-5 gap-y-8 py-7 px-2 md:gap-x-6 lg:gap-y-12 lg:gap-x-7.5 lg:py-11 lg:px-0">
                    <div class="col-span-full md:col-span-5 md:col-start-3 xl:-ml-7.5">
                        <div class="text-lg font-bold">Abertura</div>
                        <h3 class="mb-3 text-2xl font-bold leading-none md:text-2.5xl lg:mb-4 lg:text-4xl xl:text-[42px]">
                            Inscrições MPS Acamps
                        </h3>
                        <div class="text-base font-medium leading-normal">
                            As aberturas irão ocorrer no dia 14 de setembro!
                        </div>
                    </div>

                    <div class="col-span-full flex flex-wrap items-center justify-center gap-y-4 self-center md:col-span-4 md:col-start-9 lg:gap-y-0">
                        <div class="js-vv-countdown-container mb-4 grid w-full basis-full grid-cols-4 font-bold lg:mb-5 xl:pt-2.5">
                            <div class="relative flex flex-col items-center">
                                <div class="text-xl md:text-3xl xl:mb-1 xl:text-[42px]">{{ days }}</div>
                                <div class="leading-none">Dias</div>
                            </div>

                            <div class="relative flex flex-col items-center">
                                <div class="text-xl md:text-3xl xl:mb-1 xl:text-[42px]">{{ hours }}</div>
                                <div class="leading-none">Horas</div>
                            </div>

                            <div class="relative flex flex-col items-center">
                                <div class="text-xl md:text-3xl xl:mb-1 xl:text-[42px]">{{ minutes }}</div>
                                <div class="leading-none">Minutos</div>
                            </div>

                            <div class="relative flex flex-col items-center">
                                <div class="text-xl md:text-3xl xl:mb-1 xl:text-[42px]">{{ seconds }}</div>
                                <div class="leading-none">Segundos</div>
                            </div>
                        </div>

                        <div class="js-vv-countdown-progress h-2 basis-full overflow-hidden rounded-full bg-gray-900">
                            <div class="js-vv-countdown-progress-bar h-full rounded-full bg-accent" style="width: 100%;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="absolute inset-0 z-[1] bg-black mix-blend-color"></div>
            <div class="absolute inset-0 z-[2] bg-primary mix-blend-multiply"></div>
            <div class="absolute inset-0 z-[3] bg-gray-900 mix-blend-screen"></div>
            <img class="pointer-events-none absolute -left-12 bottom-0 z-[4] hidden md:!block " style="width: 400px; height: auto;" src="~assets/globo.png" alt="">

        </div>
    </div>

    <section class="pb-20 pt-4 md:pb-24 lg:pb-[130px] lg:pt-6">
      <div class="container">

        <div class="grid grid-cols-12 gap-x-5 gap-y-12 md:gap-x-6 lg:gap-x-7.5">

          <div class="hidden md:!grid col-span-full grid-cols-7 gap-x-5 sm:grid-rows-[197px_107px_85px] md:col-span-7 md:grid-rows-[152px_83px_66px] md:gap-x-6 lg:grid-rows-[197px_107px_85px] lg:gap-x-7.5 xl:grid-rows-[246px_134px_106px]">
            <figure class="col-span-full sm:row-start-1 sm:row-end-3">
              <img class="w-full sm:w-auto" src="~assets/imgs/hope.webp" alt="">
            </figure>

            <figure class="relative col-span-full sm:col-span-5 sm:col-start-3 sm:row-start-2 sm:row-end-4 sm:pl-3 sm:pr-10 ">
              <img class="w-full md:mt-12 sm:w-auto sm:shadow-[0_0_60px_0_rgba(0,0,0,.4)] max-h-96" src="~assets/imgs/umpi.webp" alt="">
            </figure>
          </div>

          <div class="col-span-full md:col-span-5 font-poppins">
            <div class="md:-ml-[76px] lg:-ml-[100px] xl:-ml-[130px]">
              <h2 class="[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] mb-8 text-2xl font-bold tracking-tighter text-white sm:mb-9 sm:text-3xl md:-mt-[0.6em] md:mb-10 md:text-4xl md:leading-none lg:-mt-[0.6em] lg:mb-12 lg:text-5xl lg:leading-none xl:-mt-[0.7em] xl:mb-14 xl:text-[62px] xl:leading-none">
                <span class="inline-block md:block">Unidos para Servir:</span>
                <span class="inline-block md:block xl:-mt-2 ml-1">
                  <span class="text-yellow-400">União</span> &amp;
                  <span class="text-yellow-400">missão</span>
                </span>
              </h2>

            </div>

            <div class="md:pl-4 md:pr-2 lg:px-7 text-xl xl:pr-[70px] xl:pl-10 [&amp;_p]:mb-8">
              <p>O MPS Acamps surge da união dos jovens da UMPI Areado com os jovens do HOPE Carmo. O desejo de servir ao Senhor não ficou apenas em nossas igrejas locais, tivemos a ideia de praticar isso em um evento capaz de unir todo o povo de Deus com o mesmo propósito. Como servos do Senhor engajamos no serviço à juventude da região, buscando alcançar adolescentes e jovens através da proclamação do Evangelho e das verdades eternas a respeito do nosso Deus, com fidelidade a Escritura Sagrada e com base na teologia reformada. Embora sejamos presbiterianos e pertencentes da Igreja Presbiteriana Independente do Brasil, somos gratos ao Senhor, pela oportunidade de caminhar com outras denominações irmãs que sempre apoiam, participam do nosso trabalho e contribuem para a nossa missão.</p>
            </div>
          </div>

        </div>
      </div>
      </section>
      <div class="pb-20 md:pb-24 md:mt-32 lg:pb-[120px] mt-11">
      <div class="container">
        <div class="mb-10 md:mb-12 lg:mb-16 xl:mb-20">
          <h2 class="text-2.5xl font-bold tracking-tighter text-gray-900 before:text-accent before:content-['.'] dark:text-white sm:text-3.5xl md:text-4xl lg:text-[62px] lg:leading-none">
            Nossa Agenda
          </h2>
        </div>

      <div class="divide-y divide-gray-500/20">
        <!-- Início das inscrições -->
        <div class="grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-7.5 py-11 first:pt-0 last:pb-0">
          <div class="col-span-2 md:col-span-1 lg:col-span-1">
            <time class="flex flex-col text-center text-xs font-bold md:text-base text-white bg-cyan-800" datetime="2024-04-14">
              <span class="text-2xl lg:text-[32px] md:leading-none h-11 lg:h-[62px] flex items-center justify-center">14</span>
              <span class="text-white leading-[28px] bg-cyan-950">Abr</span>
            </time>
          </div>

        <div class="col-span-10 md:col-span-6 lg:col-span-6">
          <h4 class="text-xl lg:text-2xl font-bold text-white mb-2 lg:mb-2.5">
            <a class="text-white transition-colors hover:text-accent dark:hover:text-accent" href="#">Início das inscrições - Lote inicial</a>
          </h4>
          <div class="lg:leading-[26px]">As inscrições para o MPS Acamps começam no dia 14 de abril.</div>
        </div>
      </div>

      <!-- Fim do lote -->
      <div class="grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-7.5 py-11 first:pt-0 last:pb-0">
        <div class="col-span-2 md:col-span-1 lg:col-span-1">
          <time class="flex flex-col text-center text-xs font-bold md:text-base text-white bg-cyan-800" datetime="2024-10-01">
            <span class="text-2xl lg:text-[32px] md:leading-none h-11 lg:h-[62px] flex items-center justify-center">01</span>
            <span class="text-white leading-[28px] bg-cyan-950">Out</span>
          </time>
        </div>

        <div class="col-span-10 md:col-span-6 lg:col-span-6">
          <h4 class="text-xl lg:text-2xl font-bold text-white mb-2 lg:mb-2.5">
            <a class="text-white transition-colors hover:text-accent dark:hover:text-accent" href="#">Fim do lote de inscrições</a>
          </h4>
          <div class="lg:leading-[26px]">O lote inicial de inscrições termina no dia 1º de outubro.</div>
        </div>
      </div>

      <!-- Check-in no acampamento -->
      <div class="grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-7.5 py-11 first:pt-0 last:pb-0">
        <div class="col-span-2 md:col-span-1 lg:col-span-1">
          <time class="flex flex-col text-center text-xs font-bold md:text-base text-white bg-cyan-800" datetime="2024-11-14 17:00">
            <span class="text-2xl lg:text-[32px] md:leading-none h-11 lg:h-[62px] flex items-center justify-center">14</span>
            <span class="text-white leading-[28px] bg-cyan-950">Nov</span>
          </time>
        </div>

        <div class="col-span-10 md:col-span-6 lg:col-span-6">
          <h4 class="text-xl lg:text-2xl font-bold text-white mb-2 lg:mb-2.5">
            <a class="text-white transition-colors hover:text-accent dark:hover:text-accent" href="#">Check-in no Acampamento</a>
          </h4>
          <div class="lg:leading-[26px]">O check-in para o MPS Acamps começa às 17h do dia 14 de novembro.</div>
        </div>
      </div>

      <!-- Checkout no acampamento -->
      <div class="grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-7.5 py-11 first:pt-0 last:pb-0">
        <div class="col-span-2 md:col-span-1 lg:col-span-1">
          <time class="flex flex-col text-center text-xs font-bold md:text-base text-white bg-cyan-800" datetime="2024-11-17 09:00">
            <span class="text-2xl lg:text-[32px] md:leading-none h-11 lg:h-[62px] flex items-center justify-center">17</span>
            <span class="text-white leading-[28px] bg-cyan-950">Nov</span>
          </time>
        </div>

        <div class="col-span-10 md:col-span-6 lg:col-span-6">
          <h4 class="text-xl lg:text-2xl font-bold text-white mb-2 lg:mb-2.5">
            <a class="text-white transition-colors hover:text-accent dark:hover:text-accent" href="#">Checkout no Acampamento</a>
          </h4>
          <div class="lg:leading-[26px]">O checkout do MPS Acamps começa às 9h do dia 17 de novembro.</div>
        </div>
      </div>

      <!-- Pós Acampa -->
      <div class="grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-7.5 py-11 first:pt-0 last:pb-0">
        <div class="col-span-2 md:col-span-1 lg:col-span-1">
          <time class="flex flex-col text-center text-xs font-bold md:text-base text-white bg-cyan-800" datetime="TBD">
            <span class="text-2xl lg:text-[32px] md:leading-none h-11 lg:h-[62px] flex items-center justify-center">TBD</span>
            <span class="text-white leading-[28px] bg-cyan-950">TBD</span>
          </time>
        </div>

        <div class="col-span-10 md:col-span-6 lg:col-span-6">
          <h4 class="text-xl lg:text-2xl font-bold text-white mb-2 lg:mb-2.5">
            <a class="text-white transition-colors hover:text-accent dark:hover:text-accent" href="#">Pós Acampa</a>
          </h4>
          <div class="lg:leading-[26px]">A data e o local do pós acampa ainda serão confirmados.</div>
        </div>
      </div>
    </div>
  </div>
</div>
<cards-animados-vue />
    <FooterSite />
</q-page>
<!-- <div class="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" ></div> -->
<!-- <div class="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" ></div> -->

</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
  onBeforeUnmount
} from 'vue'
import {
  Carousel,
  Pagination,
  Slide
} from 'vue3-carousel'
import CardsAnimadosVue from 'src/components/CardsAnimados.vue'
import 'vue3-carousel/dist/carousel.css'
import countdownBg from 'src/assets/countdown-bg.png'
import imagem1 from 'src/assets/imgs/1.webp'
import imagem2 from 'src/assets/imgs/2.webp'
import imagem3 from 'src/assets/imgs/3.webp'
import imagem4 from 'src/assets/imgs/4.webp'
import imagem5 from 'src/assets/imgs/5.webp'
import imagem6 from 'src/assets/imgs/6.webp'
import imagem7 from 'src/assets/imgs/7.webp'
import imagem8 from 'src/assets/imgs/8.webp'

import NavBar from 'src/components/NavBar.vue'

import FooterSite from 'src/components/FooterSite.vue'
export default defineComponent({
  name: 'IndexPage',
  components: {
    Carousel,
    Slide,
    Pagination,
    NavBar,
    FooterSite,
    CardsAnimadosVue
  },
  setup () {
    const days = ref(0)
    const hours = ref(0)
    const minutes = ref(0)
    const seconds = ref(0)
    const targetDate = new Date('2024-09-14T00:00:00').getTime()
    let countdownInterval = null
    const liberado = ref(false)
    const startCountdown = () => {
      const updateCountdown = () => {
        const now = new Date().getTime()
        const distance = targetDate - now

        if (distance > 0) {
          days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
          hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
        } else {
          clearInterval(countdownInterval)
        }
      }

      updateCountdown()
      countdownInterval = setInterval(updateCountdown, 1000)
    }

    onMounted(() => {
      startCountdown()
    })

    onBeforeUnmount(() => {
      clearInterval(countdownInterval)
    })
    return {
      countdownBg,
      liberado,
      days,
      hours,
      minutes,
      seconds,
      imagem1,
      imagem2,
      imagem3,
      imagem4,
      imagem5,
      imagem6,
      imagem7,
      imagem8,

      openInsta () {
        window.open('https://www.instagram.com/feupam/', '_blank')
      }

    }
  }

})
</script>

<style>
.carousel__item {
    min-height: 400px;
    width: 100%;
    background-color: var(--vc-clr-primary);
    color: white;
    font-size: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

}

@media screen and (min-width: 768px) {
    .carousel__item {
        min-height: 500px;
    }

}

@media screen and (min-width: 1000px) {
    .carousel__item {
        min-height: 700px;
    }

}

.carousel__slide {
    padding: 10px;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
}
</style>
