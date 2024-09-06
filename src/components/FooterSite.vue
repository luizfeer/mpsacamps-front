<template>
<section class="flex justify-center items-center sm:py-16 py-6 flex-col">
    <div class="flex justify-center items-start md:flex-row flex-col mb-8 w-full">
        <div class="hidden md:flex flex-[1] flex-col justify-start mr-10"><img src="~assets/FEUPAM.png" alt="hoobank" class="w-[266px] h-[72.14px] object-contain">
            <p class="font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px] mt-4 max-w-[312px]">União Presbiteriana de Adolescentes e Mocidades do Presbitério Vale do Rio Grande (FEUPAM).</p>
        </div>
        <div class="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
            <div class="flex flex-col ss:my-0 my-4 min-w-[150px]">
                <h4 class="font-poppins font-medium text-[18px] leading-[27px] text-white">Links Uteis</h4>
                <ul class="list-none mt-4">
                    <li class="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer mb-4" to="/">Home</li>
                    <li class="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer mb-4">
                        <a href="https://api.whatsapp.com/send?phone=5535999976145&text=Ol%C3%A1%2C%20preciso%20de%20ajuda" target="_blank">Contato</a></li>
                    <li class="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer mb-4" to="/conferencia">Faça sua inscrição</li>
                    <li class="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer mb-4">
                        <a href="https://api.whatsapp.com/send?phone=5535999976145&text=Ol%C3%A1%2C%20preciso%20de%20ajuda" target="_blank">Dúvidas</a>
                    </li>
                    <li class="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer mb-0">
                      <a href="/termos" target="_blank">Termos e serviços</a>
                    </li>
                </ul>
            </div>
            <!-- <div class="flex flex-col ss:my-0 my-4 min-w-[150px]">
                <h4 class="font-poppins font-medium text-[18px] leading-[27px] text-white">Eventos</h4>
                <ul class="list-none mt-4">
                    <li class="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer mb-4">Federacamps</li>
                    <li class="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer mb-4">Federalideres</li>
                    <li class="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer mb-4">Conferência Feupam</li>
                </ul>
            </div> -->
            <div class="flex flex-col ss:my-0 my-4 min-w-[150px]">
                <h4 class="font-poppins font-medium text-[18px] leading-[27px] text-white">Redes Sociais</h4>
                <ul class="list-none mt-4">
                    <li class="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer mb-4">
                        <a href="https://www.instagram.com/mpsacamps/" target="_blank" rel="noopener noreferrer">
                            Instagram
                        </a>
                    </li>
                    <li class="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer mb-0">
                        <a href="https://www.youtube.com/@MPSAcamps" target="_blank" rel="noopener noreferrer">
                            Youtube
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- <div class="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
        <p class="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">Copyright Ⓒ {{ thisYear }}. </p>
        <div class="flex flex-row md:mt-0 mt-6 items-center justify-center">
            <img src="~assets/FEUPAM-WHITE.png" alt="social-media-4" class="w-[50px] h-[50px] object-contain cursor-pointer mx-3">
            <img src="~assets/UPA.png" alt="social-media-3" class="w-[50px] h-[50px] object-contain cursor-pointer mx-3">
            <img src="~assets/UMP.png" alt="social-media-2" class="w-[50px] h-[50px] object-contain cursor-pointer mx-3">
            <img src="~assets/IPB.png" alt="social-media-1" class="w-[80px] h-[50px] object-contain cursor-pointer mx-3">
        </div>
    </div> -->
</section>
</template>

<script>
export default {
  computed: {
    thisYear () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
