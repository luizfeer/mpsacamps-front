<template>
 <div id="inscricoes" class="z-[100] relative flex justify-between flex-col p-5 lg:p-10 rounded-[20px] my-5 card-black mx-5 relative block ">
    <div class="row px-5 md:px-0">
      <q-img src="~assets/banner-conf.webp" class=" mx-4 video img-bg z-[10] rounded-lg mb-8" />

        <div class="col-md-10 col-12 pr-0 ">

            <div class="flex">
                <div class="">
                    <!-- q-icon calendar -->
                    <div>

                        <div class="text-dia"><span class="font-light italic"> {{ evento.date }} </span></div>
                    </div>
                    <div class="mt-1">
                      <span>
                        <p class="sobre font-bold text-2xl">{{ evento.name}}
                        </p>
                        <!-- <p class="mt-4">
                          Feminino: {{  lotes.loteF }}º Lote
                         <span v-if="lotes.vagasF < 40" class="text-orange-600 font-bold"> (Últimas vagas) </span>
                          <span class="text-red-600 font-bold">Vagas Esgotadas </span>

                        </p>
                        <p>
                          Masculino: {{  lotes.loteM }}º Lote
                         <span v-if="lotes.vagasM < 40" class="text-orange-600 font-bold"> (Últimas vagas) </span>
                         <span class="text-red-600 font-bold"> Esgotadas </span>
                        </p> -->
                        </span>

                      </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-12 pr-0 center-end mt-10 md:mt-0">
            <div class="p-0 w-full">
                <div class="mb-3 flex float-right">
                    <div class="content-valor text-right">
                        <p class="m-0 font-light text-base"> A PARTIR DE </p><span class="font-bold text-green-500 text-2xl">R$ 50,00</span>
                    </div>

                     <div class="content-valor text-right">
                        <!-- <p class="m-0 font-light text-base text-red-600"> Inscrições encerradas</p> -->
                    </div>
                </div>
                <div>
                    <q-btn class="p-4 px-6 w-full bg-purple-900" v-if="false"  disabled > Inscreva-se </q-btn>
                    <q-btn class="p-4 px-6 w-full bg-purple-900"  to="/inscricao/conferencia2024" v-else-if="!jaComprou"> Inscreva-se </q-btn>
                    <q-btn class="p-4 px-6 w-full bg-gray-800" v-else @click="jaInscrito()"> Inscreva-se </q-btn>
                </div>
            </div>
        </div>

    </div>

</div>
</template>

<script>
import { useUserStore } from 'stores/user'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
// import { api } from 'src/boot/axios'
export default {
  name: 'InfoEvent',

  setup () {
    const $q = useQuasar()
    const lotes = ref([])
    const shareFaceBook = () => {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href, 'facebook-share-dialog', 'width=800,height=600')
    }
    const shareWhatsApp = () => {
      window.open('https://api.whatsapp.com/send?text=' + window.location.href, 'whatsapp-share-dialog', 'width=800,height=600')
    }
    const shareTwitter = () => {
      window.open('https://twitter.com/intent/tweet?text=' + window.location.href, 'twitter-share-dialog', 'width=800,height=600')
    }
    const shareTelegram = () => {
      window.open('https://telegram.me/share/url?url=' + window.location.href, 'telegram-share-dialog', 'width=800,height=600')
    }
    const userStore = useUserStore()
    const { charges } = storeToRefs(userStore)
    const evento = 'conferencia2024'

    const jaInscrito = () => {
      $q.notify({
        message: 'Você já está inscrito nesse evento!',
        color: 'red-4',
        textColor: 'white',
        icon: 'warning',
        position: 'top'
      })
    }
    const jaComprou = computed(() => {
      if (!charges.value) return false
      const charge = charges.value.find(charge => charge.evento === evento)
      return charge && charge.status !== 'Falhou'
    })
    onMounted(() => {
      // try {
      //   api.get('/get-lote').then(({ data }) => {
      //     console.log(data.props)
      //     lotes.value = data.props
      //   })
      // } catch (error) {
      //   console.log(error)
      // }
    })

    return {
      lotes,
      jaInscrito,
      charges,
      jaComprou,
      shareFaceBook,
      shareWhatsApp,
      shareTwitter,
      shareTelegram,
      evento: {
        name: 'Espiritualidade Integral',
        date: '21 setembro'
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
