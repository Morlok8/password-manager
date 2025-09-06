<script setup lang="ts">
    import { defineProps } from 'vue';

    const textAreaValue = defineModel<string>();
    
    const inputProps = defineProps<{
        name: string,
        class?: string
    }>();
</script>

<template>
    <textarea v-bind:name="inputProps.name" v-model="textAreaValue"></textarea>
</template>