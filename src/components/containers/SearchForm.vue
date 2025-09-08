<script setup lang="ts">
    import { ref } from 'vue'
    import { useUsersStore } from '../../stores/users';
    import FormInput from '../generic/FormInput.vue';
    import Button from '../ui/Button.vue';
    import type { User } from '../../interfaces/user'; 

    const userStore = useUsersStore();

    const searchValue= ref<string>();
    const searchType = ref<string>();

    function searchUser(){
        if(searchType.value && searchValue.value)
            userStore.filterUsers(searchType.value, searchValue.value);
    }
    function unsetSearchUser(){
        userStore.unsetFilterUsers();
    }
</script>

<template>
        <div class = "flex g-3 p-3 ">
            <div class="mr-3">
                <FormInput id="search-name" name="search-name" label="Значение:" v-model="searchValue"/>
            </div>
            <div class="mr-3">
                <label for="search-type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Выберите тип фильтрации:</label>
                <select name="search-type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="searchType" id="search-type">
                    <option value="name">Название</option>
                    <option value="url">URL</option>
                    <option value="login">Логин</option>
                </select>
            </div>
            <Button class='bg-green-600 text-white rounded-sm p-2 self-end mr-3' name="Применить" :onClick="searchUser"/>
            <Button class='bg-green-600 text-white rounded-sm p-2 self-end' name="Отменить" :onClick="unsetSearchUser"/>
        </div>

    
</template>