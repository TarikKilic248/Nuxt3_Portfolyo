<script setup lang="ts">
///////////////////
// BÜTÜN GÖREVLERDE DİKKAT ETMEN GEREKENLER
// ChatGPT araştırma yapmak dışında yasak.
// Kodunun okunabilir olması ve düzenli bir şekilde yazılması çok önemli. Kod tekrarı yapmamaya özen göster.
// css kullanmak yok tamamen tailwind
// Responsive (mobil ve masaüstü cihazlarda çalışmalı). Bu aşamada tailwind kullanmakta zorlanırsan anlık
//    ekran boyutunu hesaplayıp sana isMobile ismindeki boolean değeri döndüren kodu app store açıp oraya yazarak, v-if ile durumu kontrol edebilirsin. (bu daha zor haberin olsun .d)

// Anlamadığın bir şey olursa sormaktan çekinme hatta lütfen sor benimle istediğin zaman iletişime geçebilirsin.
///////////////////

// GÖREV 1
// Burası için görevin sitene temel bir SEO yapılandırması eklemek.
// https://nuxt.com/docs/getting-started/seo-meta
// (yaptığın seonun bu aşamada işe yarar olmasına gerek yok, sadece basit bir yapılandırma olması yeterli)

useHead({
  title: 'Tarık Kılıç ALSANCAK',
  meta: [
    { name: 'To do list in nuxt', content: 'To do list of Tarik' },
  ],
  bodyAttrs: {
    class: 'test',
  },
  script: [{ innerHTML: 'console.log(\'hello world\')' }],
})
</script>

<template>
  <NuxtLoadingIndicator />
  <Transition name="page" mode="in-out">
    <NuxtPage />
  </Transition>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.5s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.page-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
