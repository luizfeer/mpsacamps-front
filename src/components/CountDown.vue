<template>
<div class="q-pa-md">

    <div class="row justify-center">
    <!-- <q-img src="~assets/federa/federa-site.webp" class=" mx-4 video img-bg z-[10] rounded-lg mb-8 z-10" /> -->

        <div class="col-auto  -mt-20 z-20">
            <q-card flat bordered class="rounded-2xl">
                <q-card-section >
                  <div class="row justify-center">

                    <div class="m-3 md:m-6 mb-0 col-auto" v-if="days">
                        <div class="text-center justify-center items-center">
                            <div class="col-auto">
                                <div class="text-2xl md:text-7xl font-bold">
                                    {{ days }}
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="q-pa-sm text-md md:text-3xl uppercase">
                                    Dias
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="m-3 md:m-6 mb-0 col-auto" v-if="hours">
                        <div class="text-center justify-center items-center">
                            <div class="col-auto">
                                <div class="text-2xl md:text-7xl font-bold">
                                    {{ hours }}
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="q-pa-sm text-md md:text-3xl uppercase">
                                    Horas
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="m-3 md:m-6 mb-0 col-auto" v-if="minutes">
                        <div class="text-center justify-center items-center">
                            <div class="col-auto">
                                <div class="text-2xl md:text-7xl font-bold">
                                    {{ minutes }}
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="q-pa-sm text-md md:text-3xl uppercase">
                                    Minutos
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="m-3 md:m-6 mb-0 col-auto">
                        <div class="text-center justify-center items-center">
                            <div class="col-auto">
                                <div class="text-2xl md:text-7xl font-bold">
                                    {{ seconds }}
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="q-pa-sm text-md md:text-3xl uppercase">
                                    Segundos
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                  <p class="italic text-center p-0 text-md text-gray-400">
                  para liberação das inscrições
                  </p>

        </q-card-section>
        </q-card>
    </div>
</div>
</div>
</template>

<script>
import {
  ref, toRefs
} from 'vue'

export default {
  props: {
    time: {
      type: String
    }
  },
  setup (props) {
    const days = ref(0)
    const hours = ref(0)
    const minutes = ref(0)
    const seconds = ref(0)
    const { time } = toRefs(props)

    const countDownDate = new Date(time).getTime()
    console.log(countDownDate)

    setInterval(() => {
      const now = new Date().getTime()
      const distance = countDownDate - now

      days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
      hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
    }, 1000)
    return {
      days,
      hours,
      minutes,
      seconds
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
