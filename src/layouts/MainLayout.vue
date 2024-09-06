<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="mb-24">
      <navigation-bar v-if="quasar.platform.is.mobile" />

      <modal-instagram />
      <router-view />
    </q-page-container>
    <!-- <q-dialog v-model="dialog" persistent>

      <q-card class="bg-grey-10 text-center">
          <q-card-section class="flex justify-end">
          <q-btn flat round icon="close" @click="dialog = false" />
        </q-card-section>
        <q-card-section class="flex items-center">
          <div class="text-h6"> JÁ FOI!! Os primeiros lotes esgotaram! <br> Aguarde! Iremos processar todos os pedidos já feitos, e em breve será anunciado o 4ª LOTE!</div>
        </q-card-section>
      </q-card>
    </q-dialog> -->

  </q-layout>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref
} from 'vue'
// import { useUserStore } from 'stores/user'
import ModalInstagram from 'src/components/ModalInstagram.vue'
import NavigationBar from 'src/components/NavigationBar.vue'
import { useQuasar } from 'quasar'
// import { useQuasar } from 'quasar'
export default defineComponent({
  name: 'MainLayout',
  components: {
    ModalInstagram,
    NavigationBar
  },
  setup () {
    const $q = useQuasar()
    const quasar = $q
    // const store = useUserStore()
    const dialog = ref(true)

    onMounted(async () => {

    })

    return {
      dialog,
      quasar

    }
  }
})
</script>
