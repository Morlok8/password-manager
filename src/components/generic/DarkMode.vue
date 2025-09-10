<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ButtonIcon from '../ui/ButtonIcon.vue';

const isDarkMode = ref<boolean>(false);

onMounted(()=>{
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      isDarkMode.value = true;
    } else {
      document.documentElement.classList.remove('dark');
      isDarkMode.value = false;
    }

});

function toggleDarkMode() {
      isDarkMode.value = !isDarkMode.value;
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
      }
    }
</script>

<template>
  <!--<button @click="toggleDarkMode" class="p-2 rounded-lg">
    {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
  </button>-->
  <ButtonIcon v-bind:icon="isDarkMode? 'iconamoon:mode-light' : 'material-symbols:dark-mode-outline-rounded'" class="cursor-pointer" v-bind:onClick="toggleDarkMode" />
</template>