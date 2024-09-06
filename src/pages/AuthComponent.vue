<template>
<NavBar />
<div class="mt-10 p-5">
  <div v-if="userStorage?.user">
    <q-img
      :src="userStorage?.user?.photoURL"
      class="rounded-full"
      style="width: 100px; height: 100px"
      spinner-color="white"
    />
    <h1 class="text-3xl text-white mt-4">Olá {{ userStorage?.user?.displayName }}</h1>
    <h1 class="text-xl text-white">Seu login foi realizado.</h1>
    <router-link to="/eventos" class="flex items-center justify-center mt-4  px-3 py-2 rounded-md bg-blue-900 bg-opacity-70 text-xl">
      <q-icon name="event_note" class="mr-2" />
      Suas inscrições
    </router-link>
    <router-link to="/atualizar-dados" class="flex items-center justify-center mt-4  px-3 py-2 rounded-md bg-blue-900 bg-opacity-70 text-xl">
      <q-icon name="event_note" class="mr-2" />
      Atualizar seus dados
    </router-link>
  </div>
  <div v-else class="flex flex-col justify-center items-center">
    <h1 class="text-3xl text-white">Você precisas realizar login</h1>
    <h1 class="text-xl text-white">Clique em login no topo da página</h1>
  </div>
</div>
<div class="absolute z-[0] w-[50%] h-[50%] right-[0%] top-[40%] blue__gradient"></div>

</template>

<script>
import NavBar from 'src/components/NavBar.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'
export default {
  name: 'AuthComponent',
  components: {
    NavBar
  },

  // import ref
  setup () {
    const store = useUserStore()
    const { userStorage } = storeToRefs(store)
    // expire token after 1 hour by localhost time saved

    return {
      userStorage

    }
  }
}
</script>
