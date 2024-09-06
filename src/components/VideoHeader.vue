<template>
  <div class="header flex fixed top-0 z-[200] p-4 flex-nowrap w-full ">
    <NavBar />

    <q-space />
    </div>
    <section class="relative">
      <SvgIcon name="TopWave" class="z-[99] top-0 right-[-10rem] absolute" />
    <div class="overlay z-[50]">
    </div>
      <CardsAnimados class="mt-20 z-[200]"/>

    <video v-if="!isMobile" class="video z-[20]" src="https://drive.google.com/uc?id=1_OuKognzhtFNzdBKBgJE43T2pquMA5yz&export=download" autoplay loop muted></video>
    <q-img src="~assets/bg.jpg" class="video img-bg z-[10]" />
    <!-- <iframe class="video" width="100%" height="100vh" src="https://www.youtube.com/embed/VNVK9BloUx0?playlist=VNVK9BloUx0&loop=1&controls=0&autoplay=1&mute=1"> </iframe> -->
  </section>
</template>

<script>
import SvgIcon from 'components/SvgIcon.vue'
import NavBar from 'components/NavBar.vue'
import CardsAnimados from 'components/CardsAnimados.vue'
export default {
  name: 'VideoHeader',
  components: {
    SvgIcon,
    NavBar,
    CardsAnimados
  },
  mounted () {
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.header')
      header.classList.toggle('bg-solid', window.scrollY > 0)
    })
  },
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    }
  }
}
</script>

<style scoped>
.header{
      transition: all .95s ease-in, opacity .95s ease-out;

}
h1.federa{
  text-shadow: 0 0 10px #000;
  font-family: 'Lato', sans-serif;
}
.shadow{
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
  height: 100vh;
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
.bg-solid
{
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
.img-bg{
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, var(--q-dark-page) 80%, var(--q-dark-page) 100%);

}

</style>
