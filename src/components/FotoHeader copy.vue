<template>
<div class="header bg-solid flex fixed top-0 z-[200] p-4 flex-nowrap w-full ">
    <NavBar />

    <q-space />
</div>
<div class="relative lx:px-32 min-h-[50vh] lg:min-h-[70vh] ">
    <!-- <SvgIcon name="TopWave" class="z-[99] top-0 right-[-10rem] absolute" /> -->
    <!-- <div class="overlay z-[50]"> </div> -->
    <!-- <q-img src="~assets/bg-federa.png" class="video img-bg z-[10]" /> -->

    <!-- <video v-if="!isMobile" class="video z-[20]" src="https://drive.google.com/uc?id=1_OuKognzhtFNzdBKBgJE43T2pquMA5yz&export=download" autoplay loop muted></video> -->
    <!-- <q-img src="~assets/font-federa.png" class="floating z-[60] mt-32 md:mt-20 " /> -->

    <!-- <iframe class="video" width="100%" height="100vh" src="https://www.youtube.com/embed/VNVK9BloUx0?playlist=VNVK9BloUx0&loop=1&controls=0&autoplay=1&mute=1"> </iframe> -->
</div>
</template>

<script>
// import SvgIcon from 'components/SvgIcon.vue'
import NavBar from 'components/NavBar.vue'
export default {
  name: 'FotoHeader',
  components: {
    // SvgIcon,
    NavBar
  },
  mounted () {
    // window.addEventListener('scroll', () => {
    //   const header = document.querySelector('.header')
    //   header.classList.toggle('bg-solid', window.scrollY > 0)
    // })
  },
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    }
  }
}
</script>

<style scoped>
.floating {
    animation: floating 5s ease-in-out infinite
}

@keyframes floating {
    0% {
        transform: translatey(0px);
    }

    50% {
        transform: translatey(-20px);
         rotate: 2deg;
    }
    100% {
        transform: translatey(0px);
    }
}

.header {
    transition: all .95s ease-in, opacity .95s ease-out;

}

h1.federa {
    text-shadow: 0 0 10px #000;
    font-family: 'Lato', sans-serif;
}

.shadow {
    text-shadow: 0 0 10px #000;
}

body {
    font-family: 'Lato', sans-serif;
    margin: 0;
}

section {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70rem;
    overflow: hidden;
}

.video {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.bg-solid {
    background: var(--q-dark-page);
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, var(--q-dark-page) 80%, var(--q-dark-page) 100%);
}

.img-bg {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, var(--q-dark-page) 80%, var(--q-dark-page) 100%);

}
</style>
