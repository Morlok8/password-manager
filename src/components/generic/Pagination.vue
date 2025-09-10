<script setup lang="ts">
    import { useUsersStore } from '../../stores/users';
    import { computed } from 'vue';
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

    function decreasePage(){
        userStore.pageDecrease();
    }

    function increasePage(){
        
        userStore.pageIncrease();
    }

    function pageChange(){
        userStore.setPage();
    }
</script>

<template>
    <div class = "flex justify-center gap-3 pt-2">
        <Button name="-" class='bg-green-600 text-white rounded-sm p-1 pl-3 pr-3' v-bind:onClick="()=>decreasePage()" />
        <select name="pagination" class='dark:text-white dark:bg-slate-800' v-model="currentPage" v-on:change="pageChange()">
            <option v-for="page in totalPages" v-bind:value=Number(page)-1>
                {{ page }}
            </option>
        </select>
        <Button name="+" class='bg-green-600 text-white rounded-sm p-1 pl-3 pr-3' v-bind:onClick="()=>increasePage()" />
    </div>
</template>