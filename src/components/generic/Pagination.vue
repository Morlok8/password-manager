<script setup lang="ts">
    import { useUsersStore } from '../../stores/users';
    import { ref, onMounted, computed } from 'vue';

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
    const thClass = "border border-gray-300 p-4 text-left font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-200";

    const editableUsers = ref<number[]>([0]);
    //const editableUsers = computed(()=> [] as number[]);//ref<number[]>([0]);

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

    function pageChange(event: Event){
        //console.log(event.target.value);
        console.log(currentPage.value);
        userStore.pageSet();
    }
</script>

<template>
    <button v-on:click="decreasePage()">-</button>
    <select name="" id="" v-model="currentPage" v-on:change="pageChange($event)">
        <option v-for="page in totalPages" v-bind:value=Number(page)-1>
            {{ page }}
        </option>
    </select>
    <button v-on:click="increasePage()">+</button>
</template>