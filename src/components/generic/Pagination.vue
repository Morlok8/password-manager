<script setup lang="ts">
    import { useUsersStore } from '../../stores/users';
    import { onMounted, computed } from 'vue';
    import Button from '../ui/Button.vue';


    const userStore = useUsersStore();
    const totalPages = computed(() => userStore.getTotalPages);

    //const currentPage = computed(() => userStore.currentPage);
    const currentPage = computed({
        get(){
            return userStore.currentPage;
        },
        set(newValue){
            userStore.currentPage = newValue;
        }
    });
    //style consts
    //const thClass = "border border-gray-300 p-4 text-left font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-200";

    onMounted(() => {
        console.log("current:");
        console.log(currentPage.value);
        console.log('total:');
        console.log(totalPages.value);
        //userStore.initialize();
        //userStore.getTotalPages;
        // Perform actions that require the component to be in the DOM,
        // such as fetching data or interacting with the DOM.
    });

    function decreasePage(){
        userStore.pageDecrease();
    }

    function increasePage(){
        
        userStore.pageIncrease();
    }

    function pageChange(){
        //console.log(event.target.value);
        userStore.pageSet();
    }
</script>

<template>
    <Button name="-" class='bg-green-600 text-white rounded-sm p-1 pl-3 pr-3' v-bind:onClick="()=>decreasePage()" />
    <select name="" id="" v-model="currentPage" v-on:change="pageChange()">
        <option v-for="page in totalPages" v-bind:value=Number(page)-1>
            {{ page }}
        </option>
    </select>
    <Button name="+" class='bg-green-600 text-white rounded-sm p-1 pl-3 pr-3' v-bind:onClick="()=>increasePage()" />
</template>