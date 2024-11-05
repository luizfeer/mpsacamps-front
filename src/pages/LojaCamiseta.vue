<template>
    <NavBar />
    <q-page>
        <div class="font-sans">
            <div class="p-4 lg:max-w-5xl max-w-lg mx-auto">
                <div class="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">

                    <div class="w-full lg:sticky top-0 sm:flex gap-2">
                        <div class="sm:space-y-3 w-16 max-sm:w-12 max-sm:flex max-sm:mb-4 max-sm:gap-4">
                            <img
                            v-for="(imagem, index) in imagens"
                            :key="index"
                            :src="imagem"
                            :alt="`Produto ${index + 1}`"
                            :class="['w-full cursor-pointer rounded-md', selectedImage === index ? 'outline' : '']"
                            @click="selectedImage = index"
                            />
                        </div>
                        <img :src="imagens[selectedImage]" alt="Produto" class="w-4/5 rounded-md object-cover" />
                    </div>

                    <div>
                        <h2 class="text-2xl font-bold text-gray-300">{{ produto.nome }}</h2>
                        <div class="flex flex-wrap gap-4 mt-4">
                            <p class="text-gray-400 text-xl font-bold">R${{ produto.preco }}</p>
                            <p class="text-gray-600 text-xl">
                                <strike>R${{ produto.precoOriginal }}</strike>
                                <!-- <span class="text-sm ml-1.5">Taxas inclusas</span> -->
                            </p>
                        </div>

                        <div class="mt-8">
                            <h3 class="text-xl font-bold text-gray-400">Cores</h3>
                            <div class="flex flex-wrap gap-4 mt-4">
                                <button
                                v-for="(cor, index) in cores"
                                :key="index"
                                @click="corSelecionada = cor.id"
                                :class="[
                                    'w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2',
                                    corSelecionada === cor.id ? 'border-blue-600' : 'border-transparent'
                                ]"
                                >
                                    <div
                                    class="w-8 h-8 rounded-full"
                                    :style="{ backgroundColor: cor.codigo }"
                                    ></div>
                                </button>
                            </div>
                        </div>

                        <div class="mt-8">
                            <h3 class="text-xl font-bold text-gray-400">Modelos</h3>
                            <div class="flex flex-wrap gap-4 mt-4">
                                <button
                                v-for="(modelo, index) in modelos"
                                :key="index"
                                @click="modeloSelecionado = modelo.id"
                                :class="[
                                    'rounded-full flex items-center justify-center shrink-0 border-2 px-3 py-2',
                                    modeloSelecionado === modelo.id ? 'border-blue-600' : 'border-gray-900'
                                ]"
                                >
                                    {{ modelo.nome }}
                                </button>
                            </div>
                        </div>

                        <div class="mt-8">
                            <h3 class="text-xl font-bold text-gray-400">Tamanhos</h3>
                            <div class="flex flex-wrap gap-4 mt-4">
                                <button
                                v-for="tamanho in tamanhosFiltrados"
                                :key="tamanho.id"
                                type="button"
                                :class="[
                                    'w-10 h-10 border-2  font-semibold text-sm rounded-full flex items-center justify-center shrink-0',
                                    tamanhoSelecionado === tamanho.id ? 'border-blue-600' : 'hover:border-blue-600 border-gray-900'
                                ]"
                                @click="tamanhoSelecionado = tamanho.id"
                                >
                                    {{ tamanho.nome }}
                                </button>
                            </div>
                        </div>

                        <div class="mt-8">
                        <div class="flex items-center gap-2">
                            <q-btn
                            flat
                            color="blue-6"
                            label="Tenho um cupom de desconto"
                            @click="showCupom = !showCupom"
                            :icon="showCupom ? 'expand_less' : 'expand_more'"
                            />
                        </div>

                        <q-slide-transition>
                            <div v-show="showCupom" class="mt-4">
                            <div class="flex gap-2">
                                <q-input
                                v-model="cupom"
                                outlined
                                dense
                                dark
                                label="Digite o código"
                                class="flex-1"
                                :disable="cupomAplicado"
                                />
                                <q-btn
                                :color="cupomAplicado ? 'negative' : 'primary'"
                                :label="cupomAplicado ? 'Remover' : 'Aplicar'"
                                @click="cupomAplicado ? removerCupom() : aplicarCupom()"
                                :loading="verificandoCupom"
                                />
                            </div>
                            <small v-if="cupomAplicado" class="text-positive">
                                Cupom aplicado! Desconto de {{ descontoCupom }}%
                            </small>
                            </div>
                        </q-slide-transition>
                        </div>

                        <button
                        type="button"
                        class="w-full mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-gray-400 text-sm font-semibold rounded-md"
                        @click="adicionarAoCarrinho"
                        :disabled="!corSelecionada || !tamanhoSelecionado"
                        >
                            Comprar por R$ {{ precoFinal }}
                        </button>

                        <div class="mt-8">
                            <h3 class="text-xl font-bold text-gray-400">Sobre sua compra</h3>
                            <ul class="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-400">
                                <li>As camisetas compradas no site serão entregas no check-in do acampamento.</li>
                                <li>Se você deseja comprar mais de uma, compre uma de cada vez.</li>
                                <li>Se atente a tabela de medidas, pois não haverá trocas.</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import NavBar from 'src/components/NavBar.vue'
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'
// import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
// import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import CryptoJS from 'crypto-js'

export default {
  name: 'LojaCamiseta',
  components: {
    NavBar
  },

  setup () {
    const store = useUserStore()
    const { userStorage } = storeToRefs(store)
    const $q = useQuasar()
    const router = useRouter()

    // Dados do produto
    const produto = ref({
      nome: 'Camiseta MPS 2024',
      preco: 60,
      precoOriginal: 80,
      descricao: 'Uma camiseta versátil e confortável'
    })

    // Imagens do produto
    const imagens = ref([
      '/verde.jpg',
      '/preta.jpg',
      '/verso.webp',
      '/frente.webp',
      '/medidas.jpeg'
    ])

    // Controle da imagem selecionada
    const selectedImage = ref(0)

    // Cores disponíveis
    const cores = ref([
      { id: 1, nome: 'Verde', codigo: '#122021' },
      { id: 2, nome: 'Preto', codigo: '#000000' }

    ])
    const corSelecionada = ref(null)

    // Modelos disponíveis
    const modelos = ref([
      { id: 'normal', nome: 'Normal Unissex' },
      { id: 'babylook', nome: 'Babylook Feminina' }
    ])
    const modeloSelecionado = ref(null)

    // Tamanhos com medidas
    const tamanhos = ref({
      babylook: [
        { id: 'P', nome: 'P', medidas: '56 alt x 43 larg' },
        { id: 'M', nome: 'M', medidas: '58 alt x 46 larg' },
        { id: 'G', nome: 'G', medidas: '60 alt x 48 larg' },
        { id: 'GG', nome: 'GG', medidas: '62 alt x 50 larg' },
        { id: 'XGG', nome: 'XGG', medidas: '65 alt x 52 larg' }
      ],
      normal: [
        { id: 'P', nome: 'P', medidas: '68 alt x 53 larg' },
        { id: 'M', nome: 'M', medidas: '70 alt x 56 larg' },
        { id: 'G', nome: 'G', medidas: '75 alt x 60 larg' },
        { id: 'GG', nome: 'GG', medidas: '78 alt x 62 larg' },
        { id: 'XGG', nome: 'XGG', medidas: '80 alt x 64 larg' }
      ]
    })

    const tamanhoSelecionado = ref(null)

    // Computed para mostrar apenas os tamanhos do modelo selecionado
    const tamanhosFiltrados = computed(() => {
      if (!modeloSelecionado.value) return []
      return tamanhos.value[modeloSelecionado.value]
    })

    const showCupom = ref(false)
    const cupom = ref('')
    const cupomAplicado = ref(false)
    const descontoCupom = ref(0)
    const verificandoCupom = ref(false)

    // Hash da senha do cupom (gerado a partir de "ACAMPAMENTO2024")
    const CUPOM_HASH = '6b2c44716c15c52fa1aff478396d92f4b978a7b32cdb09b80522a83a90c1635f'

    const precoFinal = computed(() => {
      if (!cupomAplicado.value) return produto.value.preco

      const desconto = produto.value.preco * (descontoCupom.value / 100)
      return (produto.value.preco - desconto).toFixed(2)
    })

    const aplicarCupom = async () => {
      verificandoCupom.value = true

      try {
        // Simula uma verificação assíncrona
        // await new Promise(resolve => setTimeout(resolve, 1000))

        // Gera o hash do cupom digitado
        const cupomHash = CryptoJS.SHA256(cupom.value.toUpperCase()).toString()
        // const cupomHash = cupom.value.toUpperCase()

        if (cupomHash === CUPOM_HASH) {
          cupomAplicado.value = true
          descontoCupom.value = 25
          $q.notify({
            message: 'Cupom aplicado com sucesso!',
            color: 'positive',
            position: 'top'
          })
        } else {
          $q.notify({
            message: 'Cupom inválido',
            color: 'negative',
            position: 'top'
          })
        }
      } finally {
        verificandoCupom.value = false
      }
    }

    const removerCupom = () => {
      cupomAplicado.value = false
      descontoCupom.value = 0
      cupom.value = ''
      $q.notify({
        message: 'Cupom removido',
        color: 'info',
        position: 'top'
      })
    }

    // Função para adicionar ao carrinho
    const adicionarAoCarrinho = () => {
      if (!corSelecionada.value || !tamanhoSelecionado.value || !modeloSelecionado.value) {
        return
      }

      const dadosCamiseta = {
        ...produto.value,
        preco: precoFinal.value,
        precoOriginal: produto.value.preco,
        desconto: descontoCupom.value,
        cupomAplicado: cupomAplicado.value,
        cor: cores.value.find(c => c.id === corSelecionada.value),
        modelo: modelos.value.find(m => m.id === modeloSelecionado.value),
        tamanho: tamanhos.value[modeloSelecionado.value].find(t => t.id === tamanhoSelecionado.value)
      }

      router.push({
        path: `pagamento-camiseta/${cupomAplicado.value ? 'camisetaequipe45' : 'camisetanormal60'}/${btoa(JSON.stringify(dadosCamiseta))}`
      })
    }

    return {
      userStorage,
      produto,
      imagens,
      selectedImage,
      cores,
      corSelecionada,
      modelos,
      modeloSelecionado,
      tamanhosFiltrados,
      tamanhoSelecionado,
      adicionarAoCarrinho,
      showCupom,
      cupom,
      cupomAplicado,
      descontoCupom,
      verificandoCupom,
      precoFinal,
      aplicarCupom,
      removerCupom
    }
  }
}
</script>
