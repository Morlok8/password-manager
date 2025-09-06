<script setup lang="ts">
    import { useUsersStore } from '../../stores/users';
    import { ref } from 'vue'
    import Button from '../ui/Button.vue';


    const name = ref('name');
    const url = ref('url');
    const login = ref('login');
    const password = ref('password');
    const comment = ref('comments');
    const checkbox = ref('checkbox');

    const userStore = useUsersStore();
    //const login = ref('login');
    
    function addUser(){
        let user: User = {
            id: 2,
            name: name.value,
            url: url.value,
            login: login.value,
            password: password.value,
            comment: comment.value,
            tags: "default",
            date: new Date()
            //checkbox: checkbox.value,
        };
        userStore.addUser(user);
        
    }

    function searchUser(){
        userStore.filterUsers('url', '2');
    }

    interface User{
        id: number,
        name: string;
        url: string;
        login: string;
        password: string;
        tags: string;
        comment: string;
        date: Date;
    }
</script>

<template>
    <form action="">
        <label>
            <span>Название:</span>
            <input type = "text" name="name" v-model="name">
        </label> 
        
        <label>
            <span>URL:</span>
            <input type = "text" name="url" v-model="url">
        </label> 
        
        <label>
            <span>Логин:</span>
            <input type = "text" name="login" v-model="login">
        </label> 
        
        <label>
            <span>Пароль:</span>
            <input type = "text" name="password" v-model="password">
        </label> 
        
        <label>
            <span>Метки:</span>
            <input type="text" name="tags">
        </label> 
        
        <label>
            <span>Комментарий:</span>
            <textarea  name="comments" v-model="comment"></textarea>
        </label> 
        
        <label>
            <span>Избранное:</span>
            <input type="checkbox" name="fav" value = "true">
        </label> 
        <!--<button v-on:click.prevent="addUser">
            Добавить
        </button>-->
        <Button class='bg-green-600 text-white rounded-sm p-2' name="Сохранить" :onClick="addUser"/>
        <button v-on:click.prevent="searchUser">Search</button>
    </form>
</template>