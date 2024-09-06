<template>
<!-- pagarme end payment form credit card -->
  <div class="flex flex-col items-center justify-center">
    <template v-if="method === 'cartao'">
      <CartaoPay :equipe="equipe" @success="sucessoNoPagamento(true)" />

    </template>
    <template v-else-if="method === 'boleto'">
      <BoletoPay :equipe="equipe" @success="sucessoNoPagamento(true)" />
    </template>
    <template v-else-if="method === 'pix'">
      <PixPay :equipe="equipe" @success="sucessoNoPagamento(true)" />
      </template>
</div>

</template>

<script>
import BoletoPay from './payment/BoletoPay.vue'
import CartaoPay from './payment/CartaoPay.vue'
import PixPay from './payment/PixPay.vue'

export default {
  name: 'EndPayment',
  components: {
    CartaoPay,
    BoletoPay,
    PixPay
  },
  props: {
    method: {
      type: String,
      required: true
    },
    equipe: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const sucessoNoPagamento = (sucess) => {
      emit('success', sucess)
    }
    return {
      sucessoNoPagamento
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
