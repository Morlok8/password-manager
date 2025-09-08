<script setup lang="ts">
    import { ref, defineProps } from 'vue';

    const value = defineModel();

    const inputProps = defineProps<{
        type: string,
        name: string,
        class?: string,
    }>();
</script>

<template>
    <input v-bind:type = "inputProps.type" v-bind:class="inputProps.class" v-model="value"> 
</template>