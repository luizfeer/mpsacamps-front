<template>
  <NavBar />
    <div class="absolute z-[0] w-[50%] h-[50%] right-[0%] top-[40%] purple__gradient"></div>

    <div class="p-1 md:p-2 z-10">

    <FormUser @user-created="createUser($event)" />

  </div>

</template>

<script>
import FormUser from 'src/components/FormUser.vue'
import { useRouter } from 'vue-router'
import NavBar from 'src/components/NavBar.vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'
// import { useQuasar } from 'quasar'

export default {
  name: 'InscricaoForm',
  components: {

    FormUser,
    NavBar
  },

  setup () {
    // const $q = useQuasar()
    // get id from url vue3 router
    const router = useRouter()
    const store = useUserStore()

    const { userStorage } = storeToRefs(store)
    const createUser = () => {
      // $q.notify({
      //   message: 'Usuário criado com sucesso!',
      //   color: 'green-4',
      //   textColor: 'white',
      //   icon: 'done',
      //   position: 'top'
      // })
      router.push('/profile')
    }

    // create senha equipeateofim criptografada para comparação com a digitada

    onMounted(() => {
      // const id = router.currentRoute.value.params.id

      if (!userStorage) {
        router.push('/login')
      }
    })

    return {
      createUser
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
