<script setup lang="ts">
import Header from './components/containers/Header.vue';
import Footer from './components/containers/Footer.vue';
</script>

<template>
    <Header/>
    <main class="dark:bg-slate-900 h-dvh w-full" >
      <RouterView />
    </main>
    <Footer/>
</template>