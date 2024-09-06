<template>
  <NavBar />
  <div class="absolute z-[0] w-[50%] h-[50%] right-[0%] top-[40%] purple__gradient"></div>

  <div class="p-1 md:p-2 z-10">
    <div v-if="stepInicial === 'equipe'" >

        <q-card class="bg-gray-800 max-w-xl md:backdrop md:mx-auto bg-opacity-40 mx-1 mt-5">
          <!-- <q-card-section class="row items-center">
            <div class="text-h6 w-full text-center">Você é membro da equipe ou conferencista?</div>
          </q-card-section> -->

          <div class="m-4">

            <q-btn
              label="Sou acampante"
              @click="dialog = false; stepInicial = 'form-user'"
              class="bg-purple-900 hover:bg-purple-700 w-full mt-4 rounded-lg py-3"

            />
            <q-btn
              label="Sou Equipe"
              class="bg-purple-900 hover:bg-purple-700 w-full mt-4 rounded-lg py-3"
              @click="equipe = true"
            />

          </div>
          <div class="mx-auto p-4 flex items-center w-full justify-center">

             <q-checkbox
                v-model="check"
                dense
                dark
              />
              <a href="/termos" target="_blank">Ao fazer a inscrição você concorda com os <b>termos de uso</b>.</a>
          </div>

           <q-card-section v-if="equipe">
            <hr class="border border-gray-500" />
            <p class="my-3 text-xl">
              Para continuar, digite a senha de equipe.
            </p>
            <q-input
              v-model="password"
              outlined
              type="password"
              label="Senha"
              class="q-mb-md"
            />
            <q-btn
              label="Validar"
              class="bg-green-900 hover:bg-green-700 w-full mt-4 rounded-lg py-3"
              @click="validaSenha()"
            />
          </q-card-section>
        </q-card>

    </div>
    <FormUser v-else-if="stepInicial === 'form-user'" :senhaValidada="senhaValidada" @user-created="createUser($event)" />
    <div v-else-if="stepInicial === 'pagamento'">
    <q-stepper
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
            Compra: {{ eventName }}
            <q-btn
              color="green"
              class="w-full lg:w-28 p-4"
              label="PIX"
              @click="methodPayment('pix')"
            />
            <q-btn
              color="blue"
              class="w-full lg:w-28 p-4"
              label="CARTÃO"
              @click="methodPayment('cartao')"
            />
            <!-- <q-btn
              color="deep-purple"
              class="w-full lg:w-28 p-4"
              label="BOLETO"
              @click="methodPayment('boleto')"
            /> -->
          </div>
          <div class="bg-blue-700 mt-6 border border-blue-500 text-white px-4 py-3 rounded relative bg-opacity-20" role="alert">
              <span class="block sm:inline">
                Caso você vá pagar sua inscrição a vista, priorize o pix como pagamento para agilizar a aprovação e processamento do pagamento. Mas caso não seja possível, fique a vontade para escolher outro meio de pagamento.
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
          />O pagamento está sendo processado.</p>
          <p class="text-h5 bold">
           Você deverá receber um SMS quando seu pagamento for aprovado.
          </p>
          <p class="text-h6">
            Acompanhe o status da sua incrição na página
            <router-link to="/eventos" class="text-purple-400">Minhas Inscrições</router-link>
            </p>

        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn v-if="step === 2"  @click="$refs.stepper.previous()" label="Voltar" class="bg-gray-700 hover:bg-gray-500 mt-4 rounded-lg py-3" icon="ion-arrow-back" />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
    <div v-else-if="stepInicial === 'sucesso'">
      <div class="flex flex-col items-center justify-center p-4 bg-slate-600 bg-opacity-30 rounded-lg m-2">
        <div class="text-h6">Sua inscrição já foi realizada com sucesso!</div>
        <div class="text-h6">Acompanhe o status da sua incrição na página <router-link to="/eventos" class="text-purple-400">Minhas Inscrições</router-link></div>
      </div>
    </div>
    <div v-else-if="stepInicial === 'iniciada'">
      <div class="flex flex-col items-center justify-center">
         <q-card class="bg-black-gradient" v-if="pagamentoExiste.meio==='pix'">
          <q-card-section class="text-center">
            <div class="text-h6">Você já tem um pagamento em andamento.</div>
            <div class="text-h6">Conclua o pagamento ou renicie o pagamento.</div>
            <q-img :src="pagamentoExiste.qrcodePix" alt="QRCode Pix" class="mt-12" style="height: 224px; max-width: 224px;"/>
              <p class="my-6 text-2xl">{{ (pagamentoExiste.amount/100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}</p>
              <p class="text-h6">Faça  o pagamento com o QRCODE.</p>
              <q-input
                v-model="pagamentoExiste.payLink"
                outlined
                dense
                class="bg-dark text-white"
                label="PIX Copia e cola"
              />
              <q-btn
                color="blue"
                label="Copiar"
                @click="copyToClipboard(pagamentoExiste.payLink)"
                class="mt-4"
              />
              <br />
              <div class="flex w-full align-middle gap-4 items-center justify-center">

                <q-btn label="Já realizei o pagamento" color="green-5" class='mt-20' @click="sucessoPayload" />
                <q-btn label="Cancelar pagamento" color="red-5" class='mt-20' @click="cancelarPagamento()" />
              </div>

          </q-card-section>
        </q-card>
          <q-card class="bg-black-gradient m-2 bg-opacity-70 mt-20" v-if="pagamentoExiste.meio==='boleto'">
          <q-card-section class="text-center">
            <div class="text-h6">Você já tem um pagamento em andamento.</div>
            <div class="text-h6">Conclua o pagamento ou renicie o pagamento.</div>
              <q-card-section class="text-center">
                <q-btn
                  label="Baixar Boleto"
                  color="blue"
                  :href="pagamentoExiste.payLink"
                  target="_blank"
                  class="bg-blue-900 hover:bg-blue-700 w-full mt-4 rounded-lg py-3"
                  icon="shopping_cart"
                />
              </q-card-section>

          </q-card-section>
        </q-card>
        <q-card class="bg-black-gradient" v-if="pagamentoExiste.meio==='credit_card'">
          <q-card-section class="text-center">
            <div class="text-h6">Você já tem um pagamento em andamento.</div>
            <div class="text-h6">Conclua o pagamento ou renicie o pagamento.</div>
              <div class="flex w-full align-middle gap-4 items-center justify-center">
                <q-btn label="Cancelar pagamento" color="red-5" class='mt-20' @click="cancelarPagamento()" />
              </div>

          </q-card-section>
        </q-card>

        </div>
      </div>
      <div v-else-if="stepInicial === 'falha'">
      <div class="flex flex-col items-center justify-center">
        <div class="text-h6">Ocorreu um erro ao processar o pagamento.</div>
        <div class="text-h6">Tente novamente.</div>

      </div>
    </div>
  </div>

</template>

<script>
import FormUser from 'src/components/FormUser.vue'
import { useRouter } from 'vue-router'
import NavBar from 'src/components/NavBar.vue'
import { ref, watch, onMounted } from 'vue'
import EndPayment from 'src/components/EndPayment.vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'
export default {
  name: 'InscricaoForm',
  components: {
    EndPayment,
    FormUser,
    NavBar
  },

  setup (props, { emit }) {
    const eventName = ref('')
    const $q = useQuasar()
    // get id from url vue3 router
    const router = useRouter()
    const store = useUserStore()

    const { userStorage } = storeToRefs(store)
    const userRevisado = ref(false)
    const step = ref(1)
    const method = ref(null)
    const stepInicial = ref('form-user')
    const equipe = ref(false)
    const senhaValidada = ref(false)
    const message = ref('')
    const check = ref(true)
    const id = ref('')

    // create senha equipeateofim criptografada para comparação com a digitada
    const password = ref('')
    const pagamentoExiste = ref([])

    if (!userStorage) {
      router.push('/login')
    }
    const jaEstaNoEvento = async () => {
      $q.loading.show()
      const { data } = await api.get(`/get-collection?collection=${id.value}`)
      $q.loading.hide()
      console.log(data)
      if (data.length) {
        pagamentoExiste.value = data
        if (pagamentoExiste.value.length > 0) {
        // sort by createAt._seconds
          pagamentoExiste.value.sort((a, b) => {
            return b.createAt._seconds - a.createAt._seconds
          })
        }
        console.log('pagamentoExiste.value', pagamentoExiste.value)
        pagamentoExiste.value = pagamentoExiste.value[0]
        if (pagamentoExiste.value?.status === 'Pago') {
          stepInicial.value = 'sucesso'
        } else if (pagamentoExiste.value?.status === 'Falha') {
          stepInicial.value = 'falha'
        } else if (pagamentoExiste.value?.status === 'Cancelado') {
          stepInicial.value = 'equipe'
        } else {
          stepInicial.value = 'iniciada'
        }
      }
    }

    onMounted(async () => {
      id.value = router.currentRoute.value.params.id
      if (!id.value) {
        router.push('/eventos')
      }
      if (id.value === 'dia1') {
        eventName.value = 'FederaAcamps - Diária 1º dia'
      }
      if (id.value === 'dia2') {
        eventName.value = 'FederaAcamps - Diária 2º dia'
      }
      if (id.value === 'dia3') {
        eventName.value = 'FederaAcamps - Diária 3º dia'
      }

      await jaEstaNoEvento()

      const urlParams = router.currentRoute.value.params
      console.log(urlParams.step)
      if (urlParams.step) {
        const step = urlParams.step
        stepInicial.value = step
      }
    })
    const requestCancelamento = async () => {
      $q.loading.show()
      try {
        await api.delete(`/pagarme-delete?charge_id=${pagamentoExiste.value.chargeId}&event=${id.value}`)

        $q.notify({
          message: 'Pagamento cancelado com sucesso',
          color: 'positive',
          position: 'top'
        })
        router.push('/')
      } catch (error) {
        $q.notify({
          message: 'Ocorreu um erro ao cancelar o pagamento',
          color: 'negative',
          position: 'top'
        })
      } finally {
        $q.loading.hide()
      }
    }
    const cancelarPagamento = async () => {
      // alert para confirmar
      await $q.dialog({
        title: 'Cancelar Pagamento',
        message: '<span class="text-xl mb-4">Tem certeza que deseja cancelar o pagamento?</span><br /><br />Só cancele se tiver certeza, <span class="text-red">o cancelamento pode gerar custos</span>',
        cancel: true,
        persistent: true,
        html: true
      }).onOk(() => {
        // cancelar pagamento
        requestCancelamento()
      })
    }

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

    const validaSenha = () => {
      if (password.value === 'efesios6') {
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

    const createUser = () => {
      stepInicial.value = 'pagamento'
    }
    // const statusPagarme = ref(null)
    const sucessoPayload = (payload) => {
      router.push('/eventos')
    }
    const alertEquipe = () => {
      $q.notify({
        message: 'Equipe não pode se inscrever por aqui, entre em contato com a organização do evento.',
        color: 'negative',
        position: 'top',
        icon: 'report_problem'
      })
    }
    // const pagarmeStatus = async () => {
    //   $q.loading.show()
    //   const { data } = await api.get(`/get-collection?collection=${id.value}`)
    //   pagamentoExiste.value = data
    //   if (pagamentoExiste.value.length > 0) {
    //     pagamentoExiste.value.sort((a, b) => {
    //       return b.createAt._seconds - a.createAt._seconds
    //     })
    //   }
    //   console.log(pagamentoExiste.value)
    //   pagamentoExiste.value = pagamentoExiste.value[0]
    //   if (!pagamentoExiste.value) return

    //   try {
    //     const { data } = api.get(`/pagarme-status?charge_id=${pagamentoExiste.value.chargeId}&event=${id.value}`)

    //     if (data === 'Pago') {
    //       $q.notify({
    //         message: 'Pagamento aprovado com sucesso',
    //         color: 'positive',
    //         position: 'top'
    //       })
    //       clearInterval(statusPagarme.value)

    //       router.push('/eventos')
    //     } else if (data === 'Falha') {
    //       $q.notify({
    //         message: 'Pagamento falhou',
    //         color: 'negative',
    //         position: 'top'
    //       })
    //       clearInterval(statusPagarme.value)
    //     } else if (data === 'Pocessando') {
    //       $q.notify({
    //         message: 'Pagamento ainda não concluído',
    //         color: 'warning',
    //         position: 'top'
    //       })
    //     } else if (data === 'Cancelado') {
    //       clearInterval(statusPagarme.value)

    //       $q.notify({
    //         message: 'Pagamento cancelado, refaça o pagamento',
    //         color: 'warning',
    //         position: 'top'
    //       })
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   } finally {
    //     $q.loading.hide()
    //   }
    // }

    return {
      check,
      alertEquipe,
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
      pagamentoExiste,
      copyToClipboard,
      cancelarPagamento,
      eventName
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
