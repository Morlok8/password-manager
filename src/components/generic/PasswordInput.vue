<script setup lang="ts">
    import Input from '../ui/Input.vue';
    import ButtonIcon from '../ui/ButtonIcon.vue';

    import {defineProps, defineModel, ref} from 'vue';

    defineProps<{
        id: string,
        name: string,
        label: string,
        type?: string,
        //formPasswordVisible: boolean,

    }>();
    //const  = defineProps<string>();

    const inputClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    const labelClass = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

    const password = defineModel();

    //const valueRef = ref('value');

    const formPasswordVisible = ref<boolean>(false);


    function displayPassword(){
        formPasswordVisible.value = !formPasswordVisible.value;
    }

    function copyClick(){
        if(typeof password.value === 'string'){
            navigator.clipboard.writeText(password.value);
            alert('Текст скопирован!');
        }
            
    }
</script>

<template>
     <label v-bind:for="id" v-bind:class="labelClass">{{ label }}</label>
     <div class = "flex">
        <Input v-bind:type="!formPasswordVisible ? 'password' : 'text'" v-bind:name="name" v-bind:class="inputClass" v-model="password"/>
        <ButtonIcon v-bind:icon="!formPasswordVisible ? 'streamline:visible' : 'streamline-flex:invisible-1'" class='bg-slate-600 text-white rounded-sm p-1 ml-3' v-bind:onClick="()=>displayPassword()"/>
        <ButtonIcon icon="solar:clipboard-bold" class='bg-slate-600 text-white rounded-sm p-1 ml-3' v-bind:onClick="()=>copyClick()"/>
     </div>
</template>