<template>
  <q-dialog v-model="showModal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Aviso</div>
      </q-card-section>
      <q-card-section>
        Você esta acessando o site pelo navegador do Instagram.
        Por favor, acesse nosso site pelo navegador do celular.
        Para fazer isso clique nos 3 pontinhos no canto superior direito e clique em "Abrir no navegador".
        Ou acesse o site pelo Safari ou Chrome, instalados em seu celular.
        <!-- <q-img src="~assets/gif.gif" height="500px" /> -->
      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    checkInstagramBrowser () {
      const isInstagram = /instagram/i.test(navigator.userAgent)
      if (isInstagram) {
        this.showModal = true
      }
    }
  },
  mounted () {
    this.checkInstagramBrowser()
  }
}
</script>
