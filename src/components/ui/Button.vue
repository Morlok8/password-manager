<script setup lang="ts">
  import { NButton } from 'naive-ui'
  import { defineProps } from 'vue';
  //import type { User } from '../../interfaces/user'; 


  const buttonData = defineProps<{
    name: string,
    class?: string,
    onClick?: (event?: Event, ...args: any[]) => void
  }>();

  function clickHandler(){
    if(buttonData.onClick)
      buttonData.onClick();
  }
</script>

<template>
    <button v-bind:class = "buttonData.class" v-on:click.prevent="clickHandler"> {{buttonData.name}} </button>
</template>