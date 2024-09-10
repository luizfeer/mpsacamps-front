<template>
<section class="pt-4 pb-16 lg:pt-5 lg:pb-44">
    <div class="mx-auto max-w-[1320px] bg-[#0d354e] p-4 md:pt-20 md:pb-28 lg:pt-24 pb-4">
        <div class="container">

            <div>
                <div class="mb-10 md:mb-12 lg:mb-16 xl:mb-20 flex flex-col gap-y-6 sm:flex-row sm:justify-between sm:items-center">
                    <div class="flex gap-x-6 lg:gap-x-8 items-center justify-between sm:justify-start">
                        <h2 class="text-2xl font-bold tracking-tighter text-white sm:text-3.5xl md:text-4xl lg:text-[62px]">
                            .MPS Feed
                        </h2>

                        <div class="flex gap-x-3">
                            <div class="js-vv-twitter-feed-swiper-btn-prev flex w-8 aspect-square items-center justify-center text-white hover:cursor-pointer hover:text-accent" tabindex="0" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-c1c8092a41a09219">
                                <svg class="h-2.5 w-1.5" fill="currentColor">
                                    <use xlink:href="assets/img/str1/sprite.svg#arrow-left-pixel-alt"></use>
                                </svg>
                            </div>
                            <div class="js-vv-twitter-feed-swiper-btn-next flex w-8 aspect-square items-center justify-center text-white hover:cursor-pointer hover:text-accent" tabindex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-c1c8092a41a09219">
                                <svg class="h-2.5 w-1.5" fill="currentColor">
                                    <use xlink:href="assets/img/str1/sprite.svg#arrow-right-pixel-alt"></use>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- <a href="#" class="inline-flex text-center font-bold leading-none transition-colors uppercase justify-center gap-x-3 py-4 md:py-[21px] px-7 lg:px-16 text-white ring-1 ring-inset ring-white bg-transparent hover:bg-white hover:text-gray-900 hover:ring-0">
                        <svg class="h-[14px] w-[14px]" fill="currentColor">
                            <use xlink:href="assets/img/social-icons.svg#twitter"></use>
                        </svg>
                        Follow Me!

                    </a> -->
                </div>
                <Carousel :breakpoints="breakpoints" v-bind="settings"  :wrap-around="true" class="gap-2">
                  <Slide class="text-white " v-for="(comment, index) in comments" :key="index">
                    <div class="p-4   rounded-lg  h-100">

                    <div class="flex gap-x-4 mb-5 items-start robo text-left">
                        <figure class="overflow-hidden rounded-full shrink-0">
                            <img :src="comment.picture" class="h-14 w-auto" />
                        </figure>
                        <div class="leading-tight font-bold text-left">
                            <div class="text-xl">{{ comment.nameUser }}</div>
                            <div>@{{ getUsername(comment.emailUser) }}</div>
                        </div>
                    </div>
                    <div class="text-left leading-[26px] mb-5 text-md">
                        {{ comment.comment }}
                    </div>
                    <div class="text-sm text-left">
                        <time :datetime="comment.createAt">{{ formataHorario(comment.createAt) }}</time>
                    </div>
                  </div>

                  </Slide>
                  <template #addons>
                    <navigation />
                    <pagination />
                  </template>
                </Carousel>

                <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
            </div>

        </div>
        <div class="mt-10 flex flex-nowrap items-end">
            <EmojiPicker :native="true" :text="text" :key="render" picker-type="textarea" class="emoji-picker text-black" @update:text="onChangeText" theme="dark" :static-texts="{ skinTone: 'Cor', placeholder: 'Pesquisar' }" :group-names="grupoNomes" :additional-groups="{mycustomgroup : mycustomgroup}" @select="onSelectEmoji" @keyup.enter="sendComment" />
            <!-- button send with icon  -->
            <q-btn class="w-8 ml-2 border-[#0d354e] border-2 px-8 py-4 max-h-24 mb-2" flat icon="send" size="md" @click="sendComment" />
            <div class="absolute top-0 left-0 w-full h-full" v-if="!userStorage?.user" @click.prevent="modalLogin=true"></div>

        </div>
    </div>

</section>
<ul class="cards relative">

    <q-dialog v-model="modalLogin" persistent>
        <q-card class="bg-black-gradient">
            <q-card-section class="text-center">

                <q-btn flat round icon="close" @click="modalLogin = false" class="right-0 absolute top-0" />
                <p class="p-4 mr-4">

                    Para comentar é necessário fazer login com sua conta Google.
                    Clique no botão login no topo da página.
                </p>

            </q-card-section>
        </q-card>
    </q-dialog>

</ul>
</template>

<script>
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import {
  ref,
  onMounted
} from 'vue'
import {
  api
} from 'boot/axios'
import {
  useQuasar
} from 'quasar'
import {
  storeToRefs
} from 'pinia'
import {
  useUserStore
} from 'stores/user'
import {
  formatDistanceToNow,
  parseISO
} from 'date-fns'
import {
  ptBR
} from 'date-fns/locale'
import 'vue3-carousel/dist/carousel.css'
import {
  Carousel,
  Pagination,
  Slide
} from 'vue3-carousel'
// import LoginGoogle from 'components/LoginGoogle.vue'
export default {
  components: {
    EmojiPicker,
    Carousel,
    Pagination,
    Slide
    // LoginGoogle
  },
  setup () {
    const modalLogin = ref(false)

    const store = useUserStore()
    const {
      userStorage
    } = storeToRefs(store)
    const render = ref(0)
    const $q = useQuasar()
    const text = ref('')
    const grupoNomes = {
      mycustomgroup: 'Mais usados',
      smileys_people: 'Rosto & Pessoas',
      animals_nature: 'Animais & Natureza',
      food_drink: 'Comida & Bebida',
      activities: 'Atividades',
      travel_places: 'Viagens & Lugares',
      objects: 'Objetos',
      symbols: 'Símbolos',
      flags: 'Bandeiras'
    }
    const mycustomgroup = [{
      n: ['fogo'],
      u: '1f525'
    },
    {
      n: ['coração'],
      u: '2665-fe0f'
    },
    {
      n: ['amei'],
      u: '1f60d'
    }

    ]
    const comments = ref([])

    onMounted(() => {
      getData()
    })

    const getUsername = (email) => {
      const atIndex = email.indexOf('@')
      if (atIndex !== -1) {
        return email.slice(0, atIndex)
      }
      return email // Retorna o email completo se o '@' não for encontrado
    }
    const getData = async () => {
      await api.get('/get-comments')
        .then((response) => {
          if (response.data) {
            console.log(response.data)
            comments.value.push(...response.data)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const sendComment = async () => {
      if (text.value === '') {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Digite um comentário!',
          icon: 'report_problem'
        })
        return
      }
      const comment = {
        comment: text.value
      }
      const commentLocal = {
        comment: text.value,
        nameUser: userStorage.value.user.displayName,
        picture: userStorage.value.user.photoURL
      }

      try {
        await api.post('/create-comments', comment)
        comments.value.pop(commentLocal)
        $q.notify({
          color: 'positive',
          position: 'top',
          message: 'Comentário enviado com sucesso!',
          icon: 'check_circle'
        })
      } catch (err) {
        let msg
        if (err.response) {
          msg = err.response.data.message
        } else {
          msg = 'Erro na conexão!'
        }
        $q.notify({
          color: 'negative',
          position: 'top',
          message: msg,
          icon: 'report_problem'
        })
      }

      onChangeText('')
    }

    const onChangeText = (value) => {
      text.value = value || ''
    }
    const formataHorario = (data) => {
      const date = parseISO(data)
      const distance = formatDistanceToNow(date, {
        addSuffix: true,
        locale: ptBR
      })
      return distance
    }
    // const commentCards = function () {
    //   return this.each(function () {
    //     let $this = $(this),
    //       $cards = $this.find('.card'),
    //       $current = $cards.filter('.card--current'),
    //       $next

    //     $cards.on('click', function () {
    //       if (!$current.is(this)) {
    //         $cards.removeClass('card--current card--out card--next')
    //         $current.addClass('card--out')
    //         $current = $(this).addClass('card--current')
    //         $next = $current.next()
    //         $next = $next.length ? $next : $cards.first()
    //         $next.addClass('card--next')
    //       }
    //     })

    //     if (!$current.length) {
    //       $current = $cards.last()
    //       $cards.first().trigger('click')
    //     }

    //     $this.addClass('cards--active')
    //   })
    // }

    // $('.cards').commentCards()
    // return {
    //   commentCards
    // }
    const settings = {
      itemsToShow: 1,
      snapAlign: 'left'
    }

    const breakpoints = {
      500: {
        itemsToShow: 3,
        snapAlign: 'center'
      },
      // 1024 and up
      1024: {
        itemsToShow: 5,
        snapAlign: 'start'
      }
    }
    return {
      breakpoints,
      settings,
      userStorage,
      modalLogin,
      comments,
      render,
      text,
      grupoNomes,
      sendComment,
      onChangeText,
      getUsername,
      formataHorario,
      mycustomgroup,
      onSelectEmoji (emoji) {
        console.log(emoji)
      }
    }
  }
}
</script>

<style lang="scss">
.emoji-picker .v3-emoji-picker-textarea {

    color: white;
    width: auto;
    padding-right: 40px;
    background-color: #0d354e;
    border-radius: 5px;
    border: 2px solid white!important;
    padding: 10px;
    width: 100%;
    height: 50px;
    font-size: 16px;
}

.v3-input-emoji-picker {
    width: 100%;
}

.v3-text {
    display: none;
}
.v3-input-picker-icon img {
  //inverter colors
  filter: invert(1);
}
</style>
