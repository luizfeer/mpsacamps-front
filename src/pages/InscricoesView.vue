<template>
<NavBar />

<q-page v-if="userStorage?.user" class="px-4 md:mx-auto container z-10 overflow-hidden">
  <SvgIcon name="BottomWave" class="z-[0] absolute mt-[-s22rem] rotate-[190deg]" />
    <section class="flex flex-nowrap my-20">
        <div class="flex items-center w-full p-10">
          <q-avatar size="100px" class="mr-10">
            <q-img fit="contain" :src="userStorage.user.photoURL"></q-img>
          </q-avatar>
          <div class="flex flex-col">
            <div class="text-h3">{{ userStorage.user.displayName }}</div>
            <div class="text-h5 text-dimWhite">{{ userStorage.user.email }}</div>
          </div>
        </div>
    </section>

    <div id="inscricoes" class="flex justify-between flex-col px-10 py-12 rounded-[20px] md:mr-10 sm:mr-5 mr-0 my-5 bg-slate-800 bg-opacity-40">
      <h1  class="z-30 font-poppins font-semibold text-2xl text-white xs:leading-[76.8px] leading-[66.8px] w-full">
        <q-icon name="event_note" class="mr-2" />
               Suas Inscrições
            </h1>
        <div class=" z-30 font-poppins font-normal text-[18px] leading-[32.4px] text-white my-10">
          <!-- nenhuma inscrição ul li -->
          <q-list bordered class="bg-dark text-white rounded-md">
            <q-item clickable v-if="carregandoCharge" >
              <q-item-section>
                <q-item-label>Carregando...</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-else-if="charges && charges.length === 0" >
              <q-item-section>
                <q-item-label>VocÊ ja fez sua inscrição? Aguarda até o processamento (pode demorar alguns dias), caso tenha algum problema entre em contato.</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-else v-for="item in charges" :key="item.event_desc.chargeId" @click="openModal(item)" >
              <q-item-section avatar>

                  <!-- <q-img src="~assets/federa/federa-site.webp" /> -->

              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.event_desc.data.event }}</q-item-label>
                <q-item-label caption> Status:
                  <span v-if="item.event_desc.data.status === 'Pago'">
                    <q-icon name="check_circle" color="green" />
                     {{ item.event_desc.data.status}}
                  </span>
                  <span v-else-if="item.event_desc.data.status === 'Cancelado'">
                    <q-icon name="error" color="red" />
                     {{ item.event_desc.data.status}}
                  </span>
                  <span v-else-if="item.event_desc.data.status === 'Processando'">
                    <q-icon name="hourglass_empty" color="orange" />
                     {{ item.event_desc.data.status}}
                  </span>
                  <span v-else-if="item.event_desc.data.status === 'falhou'">
                    <q-icon name="error" color="red" />
                     {{ item.event_desc.data.status}}
                  </span>
                  <span v-else>
                     {{ item.event_desc.data.status }}
                  </span>

                  </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn dense flat icon="chevron_right" />
              </q-item-section>
            </q-item>
          </q-list>
          <q-dialog
            v-model="modal"
            persistent
            transition-show="slide-up"
            transition-hide="slide-down"
          >
            <q-card class="bg-primary text-white">
              <q-bar>
                <q-space ></q-space>

                <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
                  <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
                </q-btn>
                <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
                  <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
                </q-btn>
                <q-btn dense flat icon="close" v-close-popup>
                  <q-tooltip content-class="bg-white text-primary">Fechar</q-tooltip>
                </q-btn>
              </q-bar>

              <q-card-section>
                <div class="text-h6 font-bold mb-3">{{ evento.event_desc.data.event }}</div>
                <div class="text-h6">Status:
                  <span v-if="evento.event_desc.data.status === 'Pago'">
                    <q-icon name="check_circle" color="green" />
                     {{ evento.event_desc.data.status}}
                  </span>
                  <span v-else-if="evento.event_desc.data.status === 'Cancelado'">
                    <q-icon name="error" color="red" />
                     {{ evento.event_desc.data.status}}
                  </span>
                  <span v-else-if="evento.event_desc.data.status === 'Processando'">
                    <q-icon name="hourglass_empty" color="orange" />
                     {{ evento.event_desc.data.status}}
                  </span>
                  <span v-else-if="evento.status === 'Falhou'">
                    <q-icon name="error" color="red" />
                     {{ evento.event_desc.data.status}}
                  </span>
                  <span v-else>
                     {{ evento.event_desc.data.status }}
                  </span>
                </div>
                <div v-if="evento.event_desc.data.payLink && evento.event_desc.data.meio === 'Cartão' && evento.event_desc.data.status === 'Falhou'">
                  Motivo da falha: {{ evento.event_desc.data.payLink}}
                </div>

                <div class="text-base" v-if="evento.event_desc.data.meio === 'credit_card'">Cartão de crédito</div>
                <div class="text-base" v-if="evento.event_desc.data.meio === 'boleto'">Boleto</div>
                <div class="text-base" v-if="evento.event_desc.data.meio === 'pix'">Pix</div>
                <div class="text-base">Valor:
                  {{ (evento.event_desc.data.amount/100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}
                </div>
                <div class="text-base" v-if="user.lote">Lote: {{ user.lote }}</div>

                <div class="text-base">Realizado
                  <!-- {{ formatData(evento) }} -->
                </div>
                <span v-if="evento.event_desc.data.status !== 'Pago'">

                  <router-link

                    class="bg-purple-600 text-white mt-8 relative block p-4 rounded-md"
                   to="/inscricao/federa2024"
                  >
                  Verificar pagamento
                  </router-link>

                </span>

                  <!-- <a
                    v-if="evento.event_desc.data.payLink && evento.event_desc.data.meio === 'boleto'"
                    class="bg-purple-600 text-white mt-8 relative block p-4 rounded-md"
                    :href="evento.event_desc.data.payLink"
                    target="_blank"
                  >
                  Baixar Boleto
                  </a>
                <div
                  v-if="evento.event_desc.data.payLink  && evento.event_desc.data.meio === 'pix' && evento.event_desc.data.status === 'Processando'"
                  class="bg-gray-600 text-white mt-8 relative block p-4 rounded-md"
                >
                <p class="text-base">Caso ainda não tenha efetuado o pagamento use o PIX Copia e cola</p>
                  <q-input
                    v-model="evento.event_desc.data.payLink"
                    outlined
                    dense
                    class="bg-dark text-white"
                    label="PIX Copia e cola"
                  />
                  <q-btn
                    color="blue"
                    label="Copiar"
                    @click="copyToClipboard(evento.event_desc.data.payLink)"
                    class="mt-4"
                  />
                  <br />

              </div> -->

              <div v-if="evento.event_desc.data.status === 'Processando' || evento.event_desc.data.status === 'Falhou'"  class="bg-green-700 border border-green-500 text-white px-4 py-3 rounded relative bg-opacity-20 mt-4" role="alert">
                  <p class="block ">Caso tenha algum problema com pagamento nos chame no whatsapp.</p>
                  <p class="mt-4">
                    <a class="bg-green-700 text-white w-full py-3 rounded-lg font-semibold text-sm px-4 "
                    :href="`https://api.whatsapp.com/send?phone=5535999819980&text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20com%20o%20meu%20pagamento%0A${evento.event_desc.data.meio}%0AID: ${evento.event_desc.data.chargeId}%0APor: ${user.name}`">
                      Whatsapp
                    </a>
                  </p>

              </div>

              </q-card-section>
<!--
              <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
              </q-card-section> -->
               <div class="p-6">

                  <ExtratoView  :evento="evento" :user="user" v-if="evento.event_desc.data.status === 'Pago'" />
               </div>
                <div class="text-center p-6 w-full pt-0" v-if="evento.event_desc.data.status === 'Falhou' || (evento.event_desc.data.status === 'Processando' && evento.event_desc.data.meio === 'Boleto') || (evento.event_desc.data.status === 'Processando' && evento.event_desc.data.meio === 'Pix')">
                    <router-link class="block bg-green-700 text-white w-full py-3 rounded-lg font-semibold text-sm px-4" to="/pagamento">
                      Refazer o pagamento
                    </router-link>
                </div>
                 <div class="bg-red-700 border border-red-500 text-white px-4 py-3 rounded relative bg-opacity-20" role="alert" v-if="evento.event_desc.data.status === 'Falhou' || (evento.event_desc.data.status === 'Processando' && evento.meio === 'Boleto') || (evento.status === 'Processando' && evento.meio === 'Pix')">
                    <span class="block sm:inline">Só refaça o pagamento caso você tenha certeza que sua tentativa anterior não deu certo. Pois será criado outra cobrança. </span>
                  </div>

            </q-card>
          </q-dialog>

        </div>
        <!-- <div v-if="user.idade < 18">
          <q-btn
          rounded
          label="Baixar Autorização para menores de idade"
          class="bg-purple-800 mb-4"
          href="/termo-menor.pdf"
          download
        /> -->
        <!-- </div> -->

        <!-- <div class="bg-red-700 border border-red-500 text-white px-4 py-3 rounded relative bg-opacity-20" role="alert" v-if="charges.length">
          <strong class="font-bold">Erro:</strong>
          <span class="block sm:inline">Gostaríamos de pedir desculpas pelo atraso na atualização do número de lote em seu comprovante de inscrição. Devido a instabilidades em nosso sistema, ocorreu um erro que impediu que o número de lote correto fosse exibido em seu comprovante. Dessa forma os lotes não estavam sendo atualizados.</span>
          <span class="block sm:inline mt-2 text-base font-bold">Gostaríamos de informar que o problema já foi solucionado e que seu comprovante de inscrição foi atualizado com o número de lote correto. Pedimos desculpas pelo inconveniente e agradecemos sua compreensão.</span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Fechar</title><path d="M14.348 5.652a.999.999 0 0 0-1.414 0L10 8.586 6.066 4.652a.999.999 0 1 0-1.414 1.414L8.586 10l-3.934 3.934a.999.999 0 1 0 1.414 1.414L10 11.414l3.934 3.934a.999.999 0 1 0 1.414-1.414L11.414 10l3.934-3.934a.999.999 0 0 0 0-1.414z"/></svg>
          </span>
        </div> -->

        <div class="bg-blue-700 border border-blue-500 text-white px-4 py-3 rounded relative bg-opacity-10 mt-4" role="alert">
          <strong class="font-bold">Aviso</strong>
          <span class="block sm:inline">Você não precisa nos enviar seu comprovante! Ele ficará salvo no nosso sistema.</span>

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
  onMounted,
  ref
} from 'vue'

import NavBar from 'src/components/NavBar.vue'
import SvgIcon from 'src/components/SvgIcon.vue'
import FooterSite from 'src/components/FooterSite.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/user'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import ExtratoView from 'src/components/ExtratoView.vue'
import { api } from 'boot/axios'
import {
  firebase
} from '../js/initFirebase.js'
export default defineComponent({
  name: 'inscricoesView',
  components: {
    NavBar,
    SvgIcon,
    FooterSite,
    ExtratoView
  },
  setup () {
    const maximizedToggle = ref(true)
    const store = useUserStore()

    const $q = useQuasar()
    const { userStorage, loading, charges, user } = storeToRefs(store)
    const router = useRouter()
    const modal = ref(false)
    const evento = ref(null)
    const eventos = ref([])
    const carregandoCharge = ref(true)

    const copyToClipboard = (text) => {
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      $q.notify({
        message: 'Pix-copia-cola copiado com sucesso',
        color: 'positive',
        position: 'top'
      })
    }
    // const interval = ref(null)
    onMounted(async () => {
      $q.loading.show()

      if (!userStorage) {
        router.push('/login')
      }

      await store.getUserContext()

      // interval.value = setInterval(async () => {
      //   await store.getUserContext()
      // }, 2000 * 60)
      // getEventInfo()
      carregandoCharge.value = false
      $q.loading.hide()
    })
    // onUnmounted(() => {
    //   clearInterval(interval.value)
    // })

    const getEventInfo = async (event) => {
      try {
        const evento = event
        const { data } = await api.get(`/get-collection?collection=${evento}`)
        eventos.value = data
        console.log('dart', data)
        const processando = eventos.value.filter(evento => evento.status === 'Processando')
        if (!processando) return
        processando.map(async e => {
          try {
            const { dataPagarme } = api.get(`/pagarme-status?charge_id=${e.chargeId}&event=${evento}`)
            if (dataPagarme !== 'Processando') {
              setTimeout(() => {
                getEventInfo()
              }, 10000)
            }
          } catch (error) {
            console.log(error)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    const formatData = (evento) => {
      const date = new Date(evento.createAt._seconds * 1000 + evento.createAt._nanoseconds / 1000000)

      const dia = date.getDate().toString().padStart(2, '0')
      const mes = (date.getMonth() + 1).toString().padStart(2, '0') // Os meses em JavaScript começam em 0 para janeiro, 1 para fevereiro, etc.
      const ano = date.getFullYear()

      const horas = date.getHours().toString().padStart(2, '0')
      const minutos = date.getMinutes().toString().padStart(2, '0')
      const segundos = date.getSeconds().toString().padStart(2, '0')

      return `${dia}/${mes}/${ano} às ${horas}:${minutos}:${segundos}`
    }
    const openModal = async (item) => {
      modal.value = true
      evento.value = item
      console.log('mopdal', item)
    }
    const requestPushNotificationsPermission = async () => {
      try {
        const messaging = firebase.messaging()
        console.log('Solicitando permissão para notificações...')
        messaging.getToken().then((currentToken) => {
          if (currentToken) {
            console.log('Token:', currentToken)
          } else {
            console.log('No registration token available. Request permission to generate one.')
          }
        }).catch((error) => {
          console.error('An error occurred while retrieving token. ', error)
        })
        // console.log('Token:', token)
        console.log('Permissão para notificações concedida!')
      } catch (error) {
        console.error('Erro ao solicitar permissão para notificações:', error)
      }
    }
    const requestNotificationPermission = () => {
      console.log('Solicitando permissão para notificações...')
      // Verifica se o browser suporta notificações
      if (!('Notification' in window)) {
        $q.notify({
          message: 'Este navegador não suporta notificações',
          color: 'negative',
          position: 'top'
        })
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(function (permission) {
          // Se o usuário aceitar, então é possível enviar notificações
          console.log('Permissão para notificações:', permission)
        })
      } else if (Notification.permission === 'denied') {
        console.log('Permissão para notificações negada')
      }
    }

    onMounted(() => {
      requestPushNotificationsPermission()
      requestNotificationPermission()
    })
    return {
      copyToClipboard,
      formatData,
      modal,
      userStorage,
      loading,
      charges,
      evento,
      eventos,
      openModal,
      user,
      maximizedToggle,
      getEventInfo,
      carregandoCharge
    }
  }

})
</script>

<style scoped>
</style>
