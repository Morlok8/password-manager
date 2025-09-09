<script setup lang="ts">
    import { Icon } from "@iconify/vue";
    import { defineProps } from "vue";

    const buttonProp = defineProps<{
        icon: string,
        class?: string,
        onClick?: (event?: Event, ...args: any[]) => void
    }>();

    function clickHandler(){
    if(buttonProp.onClick)
      buttonProp.onClick();
  }
</script>

<template>
    <button v-on:click="clickHandler" v-bind:class = "buttonProp.class">
        <Icon v-bind:icon="buttonProp.icon" width="24" height="24" />
    </button>
</template>

