<template>
   <div
      class="w-full h-full"
      v-if="!success"
    >

        <q-btn
          label="Pagar com Pix"
          @click="submit"
          class=" bg-green-900 hover:bg-green-700 w-full mt-4 rounded-lg py-3"
        />
    </div>
    <div v-else class="w-full h-full">
      <q-card class="bg-black-gradient">
        <q-card-section class="text-center">
          <q-img :src="pix.qrcodePix" alt="QRCode Pix" style="height: 224px; max-width: 224px;"/>
            <p>{{ (pix.amount/100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })  }}</p>
            <p class="text-h6 my-2">Faça  o pagamento com o QRCODE ou PIX Copia e Cola</p>
            <hr class="my-10 mx-auto"/>
            <q-input
              v-model="pix.payLink"
              outlined
              dense
              class="bg-dark text-white"
              label="PIX Copia e cola"
            />
            <q-btn
              color="blue"
              label="Copiar PIX Copia e cola"
              @click="copyToClipboard(pix.payLink)"
              class="mt-4 rounded-lg w-full"
              icon="ion-copy"
            />
          <p class="mt-3">
            Você pode copiar o código PIX e colar no seu aplicativo de pagamento preferido. <br>
            Você deve procurar pelo pagamento com PIX, e depois PIX Copia e cola. Não é na opção de chave pix.
          </p>
            <hr class="my-10 mx-auto"/>

            <q-btn label="Já realizei o pagamento"  class='mt-4 bg-green-900 hover:bg-green-700 w-full rounded-lg py-3' @click="emit('success', data)" />

        </q-card-section>
      </q-card>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default {
  props: {
    equipe: {
      type: Boolean,
      required: true
    }
  },
  setup (props, { emit }) {
    const enabled = ref(false)
    // const { equipe } = toRefs(props)

    const pix = ref({})
    const $q = useQuasar()
    const success = ref(false)
    const id = ref('')
    const router = useRouter()

    const form = ref({
      items: {
        amount: 0,
        description: ''
      },
      payments: {
        payment_method: 'pix'
      }
    })

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
    onMounted(() => {
      id.value = router.currentRoute.value.params.id
      form.value.items.description = id.value
      getInstallments()
    })
    const getInstallments = (amount) => {
      api.get(`/get-installments?event=${id.value}`)
        .then((response) => {
          console.log(response.data)
          form.value.items.amount = response.data.ingresso.toFixed(2).toString().replace('.', '')
        })
        .catch((error) => {
          $q.notify({
            message: error.response.data.message,
            color: 'negative',
            position: 'top'
          })
          if (error.response.data.listaEspera) {
            router.push('/lista-espera')
          }
          console.log(error)
        })
    }

    const submit = () => {
      api.post('/pagarme', form.value)
        .then((response) => {
          console.log(response)
          if (response.data) {
            success.value = true
            pix.value = response.data.json
          }
        })
        .catch(async (error) => {
          console.log(error)
          $q.notify({
            message: error.response.data.message,
            color: 'negative',
            position: 'top'
          })
          await getInstallments()
        })
    }

    return {
      copyToClipboard,
      form,
      enabled,
      submit,
      pix,
      success,
      emit

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
