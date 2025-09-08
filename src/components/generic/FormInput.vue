<script setup lang="ts">
    import Input from '../ui/Input.vue';
    import {defineProps, defineModel} from 'vue';

    defineProps<{
        id: string,
        name: string,
        label: string,
    }>();
    //const  = defineProps<string>();

    const inputClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    const labelClass = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

    const value = defineModel();
</script>

<template>
     <label v-bind:for="id" v-bind:class="labelClass">{{ label }}</label>
     <Input type = "text" v-bind:name="name" v-bind:class="inputClass" v-model="value"/>
</template>