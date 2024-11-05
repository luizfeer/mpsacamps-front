<template>
  <div class="flex flex-col">
    <div class="bg-blue-900 border border-blue-800 text-white px-4 py-3 rounded relative bg-opacity-20 mb-4">
      <span class="block sm:inline">
        Para agilizar a aprovação e processamento do pagamento, priorize o PIX como meio de pagamento.
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <q-btn
        class="bg-green-700 text-white py-3 rounded-lg font-semibold"
        @click="selecionarMetodo('pix')"
      >
        <q-icon name="qr_code" class="q-mr-sm" />
        PIX
      </q-btn>

      <q-btn
        class="bg-blue-700 text-white py-3 rounded-lg font-semibold"
        @click="selecionarMetodo('credit_card')"
      >
        <q-icon name="credit_card" class="q-mr-sm" />
        Cartão de Crédito
      </q-btn>

      <q-btn
        class="bg-orange-700 text-white py-3 rounded-lg font-semibold"
        @click="selecionarMetodo('boleto')"
      >
        <q-icon name="receipt" class="q-mr-sm" />
        Boleto
      </q-btn>
    </div>

    <EndPayment
      v-if="metodoPagamento"
      :method="metodoPagamento"
      :valor="valorTotal"
      :produto="dadosProduto"
      @success="sucessoPagamento"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import EndPayment from '../EndPayment.vue'
// import { useQuasar } from 'quasar'

export default {
  name: 'CamisetaPay',
  components: { EndPayment },
  props: {
    produto: {
      type: Object,
      required: true
    }
  },

  setup (props, { emit }) {
    // const $q = useQuasar()
    const metodoPagamento = ref(null)

    const valorTotal = computed(() => props.produto.preco * 100) // Convertendo para centavos

    const dadosProduto = computed(() => ({
      nome: 'Camiseta MPS 2024',
      descricao: `${props.produto.modelo} - Tam: ${props.produto.tamanho} - Cor: ${props.produto.cor}`,
      valor: valorTotal.value
    }))

    const selecionarMetodo = (metodo) => {
      metodoPagamento.value = metodo
    }

    const sucessoPagamento = (payload) => {
      emit('success', payload)
    }

    return {
      metodoPagamento,
      valorTotal,
      dadosProduto,
      selecionarMetodo,
      sucessoPagamento
    }
  }
}
</script>
