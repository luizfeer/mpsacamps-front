<template>
  <NavBar />

  <div class="absolute z-[0] w-[50%] h-[50%] right-[0%] top-[40%] purple__gradient"></div>

    <div class="p-1 z-10 md:p-10">
      <div class="bg-red-700 mt-6 border border-red-500 text-white px-4 py-3 rounded relative bg-opacity-20" role="alert" v-if="false">
            <span class="block sm:inline">
              Olá! Agradecemos pelo seu pagamento recente. No entanto, parece que precisamos de mais tempo para processá-lo completamente. Por favor, aguarde por cerca de uma hora antes de tentar novamente. Se você tiver alguma dúvida ou preocupação, sinta-se à vontade para entrar em contato conosco via WhatsApp. Estaremos felizes em ajudá-lo(a). Obrigado pela sua compreensão!
            </span>
          </div>

    <div v-else-if="user.listaEspera">
        <div class="text-xl text-center text-white">
            Você está na lista de espera
        </div>
        <div class="text-lg text-center text-white">
          <div class="p-6">
          <p class="mb-4">Prezado(a) <span class="font-bold">{{ user.name }}</span>,</p>
          <p class="mb-4">Gostaríamos de informar todas as vagas já foram preenchidas.</p>
          <p class="mb-4">Não se preocupe, caso haja alguma desistência ou surgimento de novas vagas, entraremos em contato com você o mais breve possível para confirmar sua inscrição.</p>
          <p class="mb-4">Agradecemos pelo seu interesse e aguardamos a oportunidade de tê-lo(a) conosco neste evento.</p>
          <p class="mt-4">Atenciosamente,</p>
          <p class="font-bold">Feupam.</p>
        </div>
        </div>

    </div>

    <q-stepper
        v-else
        v-model="step"
        ref="stepper"
        dark
        class="bg-gray-800  bg-opacity-30"
        active-color="blue-4"
        done-color="secondary"
        animated
        vertical
      >
        <q-step
          :name="1"
          title="Selecione o meio de Pagamento"
          icon="payment"
          :done="step > 1"
        >
          <!--make selector o meio de pagamento PIX, BOLETO, CARTÃO -->
          <div class="flex gap-5">
            <q-btn
              color="deep-purple"
              label="PIX"
              @click="methodPayment('pix')"
            />
            <q-btn
              color="deep-purple"
              label="BOLETO"
              @click="methodPayment('boleto')"
            />
            <q-btn
              color="deep-purple"
              label="CARTÃO"
              @click="methodPayment('cartao')"
            />

          </div>
          <div class="bg-blue-900 mt-6 border border-blue-800 text-white px-4 py-3 rounded relative bg-opacity-20" role="alert">
            <span class="block sm:inline">
              Caso você vá pagar sua inscrição a vista, priorize o PIX como pagamento para agilizar a aprovação e processamento do pagamento. Mas caso não seja possível, fique a vontade para escolher outro meio de pagamento.
            </span>
          </div>
        </q-step>

        <q-step
          :name="2"
          title="Pagamento"
          icon="payment"
          :done="step > 2"
        >
        <EndPayment :equipe="equipe" :method="method" @success="sucessoPayload($event)"/>
        </q-step>

        <q-step
          :name="3"
          title="Inscrição realizada"
          icon="add_comment"
        >
          <p class="text-h6">
          <q-spinner-dots
            class=""
            color="white"
            size="50px"
          />o pagamento está sendo processado.</p>
          <p class="text-h6">
            Acompanhe o status da sua incrição na página
            <router-link to="/eventos" class="text-purple-400">Minhas Inscrições</router-link>
            </p>

        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn v-if="step === 2" color="deep-orange" @click="$refs.stepper.previous()" label="Voltar" class="q-ml-sm" />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>

</template>

<script>
import { useRouter } from 'vue-router'
import NavBar from 'src/components/NavBar.vue'
import { ref, watch } from 'vue'
import EndPayment from 'src/components/EndPayment.vue'
import { useQuasar } from 'quasar'
import { useUserStore } from 'stores/user'
import { storeToRefs } from 'pinia'

export default {
  name: 'SegundoPagamento',
  components: {
    EndPayment,
    NavBar
  },

  setup () {
    const store = useUserStore()
    const { userStorage, charges, user } = storeToRefs(store)
    const $q = useQuasar()
    // get id from url vue3 router
    const router = useRouter()
    const userRevisado = ref(false)
    const step = ref(1)
    const method = ref(null)
    const stepInicial = ref('equipe')
    const equipe = ref(false)
    const senhaValidada = ref(false)
    const message = ref('')
    const check = ref(true)
    // create senha equipeateofim criptografada para comparação com a digitada
    const password = ref('')

    if (!userStorage) {
      router.push('/login')
    }

    const validaSenha = () => {
      if (password.value === 'equipeunidos') {
        senhaValidada.value = true

        stepInicial.value = 'form-user'
      } else {
        $q.notify({
          message: 'Senha incorreta',
          color: 'negative',
          position: 'top',
          icon: 'report_problem'
        })
      }
    }
    watch(check, (val) => {
      if (!val) {
        $q.notify({
          message: 'Você deve concordar com os termos de uso.',
          color: 'negative',
          position: 'top',
          icon: 'report_problem'
        })
      }
    })

    const methodPayment = (pay) => {
      method.value = pay
      step.value = 2
    }
    const id = router.currentRoute.value.params.id
    const createUser = () => {
      stepInicial.value = 'pagamento'
    }
    const sucessoPayload = (payload) => {
      message.value = payload
      step.value = 3
      setTimeout(() => {
        router.push('/eventos')
      }, 20000)
    }

    return {
      charges,
      check,
      equipe,
      password,
      stepInicial,
      id,
      step,
      userRevisado,
      method,
      methodPayment,
      validaSenha,
      senhaValidada,
      createUser,
      message,
      sucessoPayload,
      user
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
