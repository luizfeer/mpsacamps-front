<template>
<q-form @submit.prevent="onSubmit" class="q-gutter-md w-full" v-if="!creditCard">

  <div class="border border-gray-500 rounded-xl p-1 md:p-4">
      <p class="p-1 md:p-4 text-lg font-bold">Dados do cartão</p>

    <!-- <div class="p-1 md:p-4 col-12">
       <q-checkbox
          v-model="enabled"
          label="Tenho um cupom de desconto"
        />
        <q-input
          v-model="form.voucher.code"
          v-if="enabled"
          dark
          filled
          debounce="1000"
          label-color="white"
          class="bg-dark text-white"
          label="Código do Voucher"
        />
        <br>

    </div> -->

    <div class="row col-12">
        <div class="p-1 md:p-4 col-12 col-md-6">
            <q-input v-model="form.payments.credit_card.card.holder_name" label="Nome do titular" filled lazy-rules :rules="[ val => !!val || 'Nome do titular é obrigatório' ]" dark />
        </div>
        <div class="p-1 md:p-4 col-12 col-md-6">
            <q-input v-model="form.payments.credit_card.card.number" label="Numero do cartão" mask="#### #### #### ####" filled lazy-rules :rules="[ val => !!val || 'Número do Cartão é obrigatório' ]" dark />
        </div>
    </div>
    <div class="row col-12">
        <div class="p-1 md:p-4 col-12 md:col-4">
            <q-input v-model="form.payments.credit_card.card.exp_month" placeholder="XX" label="Mês de expiração" mask="##" class="col-3" filled lazy-rules :rules="[ val => !!val || 'Mês de expiração é obrigatório' ]" dark />

        </div>
        <div class="p-1 md:p-4 col-12 md:col-4">
            <q-input v-model="form.payments.credit_card.card.exp_year" placeholder="XX" label="Ano de expiração" mask="##" class="col-3" filled lazy-rules :rules="[ val => !!val || 'Ano de expiração é obrigatório' ]" dark />

        </div>
        <div class="p-1 md:p-4 col-12 md:col-4">
            <q-input v-model="form.payments.credit_card.card.cvv" label="CVV" placeholder="XXX" class="col-3" mask="###" filled lazy-rules :rules="[ val => !!val || 'CVV é obrigatório' ]" dark />
        </div>
    </div>
    <div class="row col-12">
        <div class="p-1 md:p-4 col-12 col-md-6">
            <q-select v-model="form.payments.credit_card.installments" emit-value filled color="blue" class="mb-5" dark label="Parcelas" :options="parcelas" option-label="label" option-value="value" />
        <br>
          <span class="text-sm italic">
            <span>  Valor total: R${{ parcelas[form.payments.credit_card.installments]?.amount/100 }}.</span>

           <br/> As taxas de parcelamento são cobradas pela plataforma de pagamentos.
           <br/>
           <b>
            Para não pagar taxas, escolha a opção de pagamento PIX.
           </b>

          </span>

        </div>
    </div>
    <div class="border border-gray-500 rounded-md mx-1 md:mx-2 text-white">
      <p class="p-1 md:p-4 text-lg font-bold">Endereço de cobrança</p>
      <div>
          <q-checkbox v-model="cobranca" label="Usar meu endereço como endereço de cobrança" />
      </div>
      <div class="row col-12">
          <div class="p-1 md:p-4 col-12 col-md-6">
              <q-input v-model="form.payments.credit_card.card.billing_address.line_1" :disable="cobranca" label="Endereço" filled lazy-rules :rules="[ val => !!val || 'Endereço é obrigatório' ]" dark />
          </div>
          <div class="p-1 md:p-4 col-12 col-md-6">
            <q-input v-model="form.payments.credit_card.card.billing_address.zip_code" :disable="cobranca" label="CEP" mask="#####-###" filled class="col-4" lazy-rules :rules="[ val => !!val || 'CEP é obrigatório' ]" dark />
          </div>
          <div class="p-1 md:p-4 col-12 col-md-6">
            <q-input v-model="form.payments.credit_card.card.billing_address.city" :disable="cobranca" label="Cidade" class="col-4" filled lazy-rules :rules="[ val => !!val || 'Cidade é obrigatório' ]" dark />
          </div>
          <div class="p-1 md:p-4 col-12 col-md-6">
            <q-select v-model="form.payments.credit_card.card.billing_address.state" :disable="cobranca" emit-value filled color="blue" class="mb-5" dark label="Estado" :options="states" />
          </div>

        </div>
      </div>

  </div>

     <q-btn
          label="Finalizar compra"
          @click="onSubmit"
          class="bg-green-900 hover:bg-green-700 mt-4 rounded-lg py-3 px-5"
          icon="shopping_cart"
        />
</q-form>

</template>

<script>
import {
  ref, onMounted, watch
} from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'
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
    // const { equipe } = toRefs(props)

    const userStore = useUserStore()
    const router = useRouter()
    const $q = useQuasar()
    const { user } = storeToRefs(userStore)
    const parcelas = ref([])
    const cobranca = ref(false)
    const creditCard = ref(null)
    const enabled = ref(false)
    const id = ref('')
    const states = ref([
      { label: 'Acre', value: 'AC' },
      { label: 'Alagoas', value: 'AL' },
      { label: 'Amapá', value: 'AP' },
      { label: 'Amazonas', value: 'AM' },
      { label: 'Bahia', value: 'BA' },
      { label: 'Ceará', value: 'CE' },
      { label: 'Distrito Federal', value: 'DF' },
      { label: 'Espírito Santo', value: 'ES' },
      { label: 'Goiás', value: 'GO' },
      { label: 'Maranhão', value: 'MA' },
      { label: 'Mato Grosso', value: 'MT' },
      { label: 'Mato Grosso do Sul', value: 'MS' },
      { label: 'Minas Gerais', value: 'MG' },
      { label: 'Pará', value: 'PA' },
      { label: 'Paraíba', value: 'PB' },
      { label: 'Paraná', value: 'PR' },
      { label: 'Pernambuco', value: 'PE' },
      { label: 'Piauí', value: 'PI' },
      { label: 'Rio de Janeiro', value: 'RJ' },
      { label: 'Rio Grande do Norte', value: 'RN' },
      { label: 'Rio Grande do Sul', value: 'RS' },
      { label: 'Rondônia', value: 'RO' },
      { label: 'Roraima', value: 'RR' },
      { label: 'Santa Catarina', value: 'SC' },
      { label: 'São Paulo', value: 'SP' },
      { label: 'Sergipe', value: 'SE' },
      { label: 'Tocantins', value: 'TO' }
    ])
    const form = ref({
      items: {
        amount: 0,
        description: ''
      },
      payments: {
        payment_method: 'credit_card',
        credit_card: {
          installments: 1,
          statement_descriptor: 'FEDERA',
          card: {
            number: '',
            holder_name: '',
            exp_month: '',
            exp_year: '',
            cvv: '',
            billing_address: {
              line_1: '',
              zip_code: '',
              city: '',
              state: '',
              country: 'BR'
            }
          }
        }
      }
    })
    const ingresso = ref({})
    watch(() => form.value.payments.credit_card.installments,
      (value) => {
        // find value of installments in pacelas and get amount
        const parcela = parcelas.value.find((item) => item.value === value)
        // set amount in credit_card
        form.value.items.amount = parcela.amount
      })

    onMounted(async () => {
      id.value = router.currentRoute.value.params.id
      form.value.items.description = id.value

      const total = form.value.items.amount / 100
      console.log(total)
      await getInstallments(total)
    })
    // function getInstallments try to get /get-installments
    const getInstallments = (amount) => {
      api.get(`/get-installments?event=${id.value}`)
        .then((response) => {
          console.log(response.data)
          const apiParcelas = response.data
          console.log(apiParcelas)
          ingresso.value = apiParcelas.ingresso

          form.value.items.amount = apiParcelas.ingresso.toFixed(2).toString().replace('.', '')

          apiParcelas.installments = apiParcelas.installments.map((item) => ({
            label: `${item.installments} vezes de R$${item.valor} - Total: R$${(item.total / 100)} `,
            value: item.installments,
            amount: item.total
          }))
          parcelas.value = [
            ...apiParcelas.installments
          ]
          // parcelas.value.push({ label: `1 vez de R$${amount}.00 - sem acrescimos`, value: 1, amount: amount * 100 })

          // for (let i = 0; i <= apiParcelas.length; i++) {
          //   const obj = { label: `${apiParcelas[i].installments} vezes de R$${apiParcelas[i].valor} - Total: ${(apiParcelas[i].total / 100)} `, value: apiParcelas[i].installments, amount: apiParcelas[i].total }
          //   console.log(obj)
          //   parcelas.value.push(obj)
          // }
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

    watch(cobranca, (val) => {
      if (val) {
        form.value.payments.credit_card.card.billing_address.line_1 = user.value.address
        form.value.payments.credit_card.card.billing_address.zip_code = user.value.cep
        form.value.payments.credit_card.card.billing_address.city = user.value.cidade
        form.value.payments.credit_card.card.billing_address.state = user.value.estado
        form.value.payments.credit_card.card.billing_address.country = 'BR'
      } else {
        form.value.payments.credit_card.card.billing_address.line_1 = ''
        form.value.payments.credit_card.card.billing_address.zip_code = ''
        form.value.payments.credit_card.card.billing_address.city = ''
        form.value.payments.credit_card.card.billing_address.state = ''
        form.value.payments.credit_card.card.billing_address.country = 'BR'
      }
    })
    const onSubmit = async () => {
      $q.loading.show({
        delay: 400 // ms
      })

      try {
        const { data } = await api.post('/pagarme', form.value)
        console.log(data)
        if (data.status) {
          creditCard.value = data
          emit('success', data)
        }
      } catch (err) {
        if (err.response.data.message) {
          $q.notify({
            message: err.response.data.message,
            color: 'negative',
            position: 'top',
            timeout: 2000
          })
          return
        }
        $q.notify({
          message: err.response.data,
          color: 'negative',
          position: 'top',
          timeout: 2000
        })
      } finally {
        $q.loading.hide()
      }
    }

    return {
      creditCard,
      cobranca,
      form,
      states,
      parcelas,
      onSubmit,
      enabled
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
