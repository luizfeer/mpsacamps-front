<template>
    <div
      class="w-full h-full"
      v-if="!success"

    >
        <q-btn
          label="Gerar Boleto"
          @click="submit"
          icon="shopping_cart"
          class="bg-green-900 hover:bg-green-700 w-full mt-4 rounded-lg py-3"
        />
    </div>
    <div v-else class="w-full h-full">
      <q-card>
        <q-card-section class="text-center">
          <q-icon name="done" color="green" class="text-5xl" />
          <p>Boleto gerado com sucesso!</p>

        </q-card-section>

        <q-card-section class="text-center">
          <q-btn
            label="Baixar Boleto"
            color="blue"
            :href="boleto.payLink"
            target="_blank"
            icon="shopping_cart"
            class="bg-reen-900 hover:bg-reen-700 w-full mt-4 rounded-lg py-3"
          />
        </q-card-section>

      </q-card>

      <q-btn label="Já realizei o pagamento" class='mt-20 bg-blue-900 hover:bg-blue-700 w-full rounded-lg py-3' @click="emitir('success', data)" />

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
    const boleto = ref({})
    const $q = useQuasar()
    const enabled = ref(false)
    const data = ref({})
    const id = ref('')
    const router = useRouter()

    // const { equipe } = toRefs(props)

    const success = ref(false)
    const form = ref({
      items: {
        amount: 0,
        description: ''
      },
      payments: {
        payment_method: 'boleto',
        boleto: {
          instructions: 'Sua compra só será contabilizada depois do pagamento',
          due_at: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toISOString()
        }
      }
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
          // if error contais listaEspera = true redirect
          if (error.response.data.listaEspera) {
            router.push('/lista-espera')
          }

          console.log(error)
        })
    }
    onMounted(() => {
      id.value = router.currentRoute.value.params.id
      form.value.items.description = id.value
      getInstallments()
    })
    const submit = () => {
      $q.loading.show()
      api.post('/pagarme', form.value)
        .then((res) => {
          console.log(res)
          if (res.data) {
            $q.loading.hide()
            success.value = true
            boleto.value = res.data
            data.value = res.data
          }
        })
        .catch(async (err) => {
          $q.loading.hide()
          $q.notify({
            message: err.response.data.message,
            color: 'negative',
            position: 'top',
            timeout: 2000
          })
          await getInstallments()
        })
    }
    const emitir = (nome, data) => {
      emit(nome, data)
    }
    return {
      form,
      submit,
      enabled,
      success,
      data,
      boleto,
      emitir
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
