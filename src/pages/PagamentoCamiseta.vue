<template>
  <NavBar />
  <div class="p-1 md:p-2 z-10"  v-if="produtoData">
    <div v-if="stepInicial === 'pagamento'">
      <q-stepper
        v-model="step"
        ref="stepper"
        dark
        class="bg-gray-800 bg-opacity-30"
        active-color="blue-4"
        done-color="secondary"

        animated
      >
        <q-step
          :name="1"
          title="Confirmação"
          icon="shopping_cart"
          :done="step > 1"
        >
          <div class="text-h6">Confirme os detalhes da sua camiseta</div>
          <div class="my-4">
            <p>Modelo: {{ produtoData.produto.modelo.nome }}</p>
            <p>Tamanho: {{ produtoData.produto.tamanho.nome }}</p>
            <p>Cor: {{ produtoData.produto.cor.nome }}</p>
            <p>Valor: R$ {{ produtoData.produto.preco }}</p>
          </div>

          <q-btn
            color="primary"
            @click="step = 2"
            label="Continuar para pagamento"
          />
        </q-step>

        <q-step
          :name="2"
          title="Selecione o meio de Pagamento"
          icon="payment"
          :done="step > 2"
        >
          <div class="flex gap-5">
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
          </div>
          <div class="bg-blue-700 mt-6 border border-blue-500 text-white px-4 py-3 rounded relative bg-opacity-20" role="alert">
            <span class="block sm:inline">
              Para agilizar a aprovação e processamento do pagamento, priorize o PIX como meio de pagamento.
            </span>
          </div>
        </q-step>

        <q-step
          :name="3"
          title="Pagamento"
          icon="payment"
          :done="step > 3"
        >
          <EndPayment
            :method="method"
            :produto="produtoData.produto"
            @success="sucessoPayload($event)"
          />
        </q-step>

        <q-step
          :name="4"
          title="Pedido realizado"
          icon="check_circle"
        >
          <div class="text-center">
            <p class="text-h6">
              <q-spinner-dots
                color="white"
                size="50px"
              />
              O pagamento está sendo processado.
            </p>
            <p class="text-h5 bold">
              Você deverá receber um SMS quando seu pagamento for aprovado.
            </p>
            <p class="text-h6">
              Acompanhe o status do seu pedido na página
              <router-link to="/eventos" class="text-purple-400">Minhas Inscrições</router-link>
            </p>
          </div>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              v-if="step > 1"
              @click="$refs.stepper.previous()"
              label="Voltar"
              class="bg-gray-700 hover:bg-gray-500 mt-4 rounded-lg py-3"
              icon="ion-arrow-back"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
    <div v-else-if="stepInicial === 'sucesso'">
      <div class="flex flex-col items-center justify-center p-4 bg-slate-600 bg-opacity-30 rounded-lg m-2">
        <div class="text-h6">Seu pedido já foi realizado com sucesso!</div>
        <div class="text-h6">Acompanhe o status na página <router-link to="/eventos" class="text-purple-400">Minhas Inscrições</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
// import { api } from 'boot/axios'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'
import NavBar from 'src/components/NavBar.vue'
import EndPayment from 'src/components/EndPayment.vue'

export default {
  name: 'PagamentoCamiseta',
  components: {
    NavBar,
    EndPayment
  },
  props: {
    produto: {
      type: Object,
      default: null
    }
  },
  setup (props) {
    const router = useRouter()
    const $q = useQuasar()
    const store = useUserStore()
    const { userStorage } = storeToRefs(store)

    const step = ref(1)
    const method = ref(null)
    const stepInicial = ref('pagamento')
    const pagamentoExiste = ref(null)
    const produtoData = ref(null)

    if (!userStorage) {
      router.push('/login')
    }

    // const jaExistePedido = async () => {
    //   try {
    //     const { data } = await api.get('/get-collection?collection=camiseta')
    //     if (data.length) {
    //       pagamentoExiste.value = data[0]
    //       if (pagamentoExiste.value.status === 'Pago') {
    //         stepInicial.value = 'sucesso'
    //       } else if (pagamentoExiste.value.status === 'Processando') {
    //         stepInicial.value = 'iniciada'
    //       }
    //     }
    //   } catch (error) {
    //     console.error(error)
    //   }
    // }

    onMounted(() => {
      console.log(router.currentRoute.value.params.produto)
      try {
        const produtoQuery = router.currentRoute.value.params.produto

        console.log(produtoQuery)
        if (!produtoQuery) {
          throw new Error('Dados do produto não encontrados')
        }

        // Decodificando o base64 e parseando o JSON
        const decodedData = atob(produtoQuery.toString())
        console.log('decodedData', decodedData)
        produtoData.value = { produto: JSON.parse(decodedData) }
      } catch (error) {
        console.error('Erro ao processar dados do produto:', error)
        $q.notify({
          message: 'Erro ao carregar dados do produto',
          color: 'negative',
          position: 'top'
        })
        router.push('/loja')
      }
    })

    const methodPayment = (pay) => {
      method.value = pay
      step.value = 3
    }

    const sucessoPayload = (payload) => {
      step.value = 4
      setTimeout(() => {
        router.push('/eventos')
      }, 5000)
    }

    return {
      step,
      method,
      stepInicial,
      methodPayment,
      sucessoPayload,
      pagamentoExiste,
      produtoData
    }
  }
}
</script>
