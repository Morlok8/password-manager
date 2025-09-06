<script setup lang="ts">
    import { useUsersStore } from '../../stores/users';
    import { ref, defineProps } from 'vue';
    import type { User } from '../../interfaces/user'; 
    import Button from '../ui/Button.vue';
    import Input from '../ui/Input.vue';
    import Textarea from '../ui/Textarea.vue';


    const edit = ref(false);

    const userInfo = defineProps<{
        id: number
        name?: string
        url?: string
        login?: string
        password?: string
        date: Date
        tags?: string
        comment?: string
        edit?: boolean
    }>();

    const name = defineModel('name');
    const url = defineModel('url');
    const login = defineModel('login');
    const password = defineModel('password');
    const tags = defineModel('tags');
    const comment = defineModel('comment');
    //const edit:  = defineModel('url');

    const editableUser = ref([userInfo]);
    const userStore = useUsersStore();

    const tdClass = "border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400";


    function saveEdit(id: number){
        console.log("editable");
        console.log(editableUser.value[0].id);
        userStore.editUser(id);
        
    }
    
</script>

<template>
    <td v-bind:class = tdClass>
       <span >{{ userInfo.id }}</span>
    </td>
    <td v-bind:class = tdClass>
       <!--
        <input type = "text" name="name" v-model="name" v-if="userInfo.edit"> 
       -->
       <Input type = "text" name="name" v-model="name" v-if="userInfo.edit"/>
       <span v-else>{{ userInfo.name }}</span>
    </td>
    <td v-bind:class = tdClass>
       <Input type = "text" name="url" v-model="url" v-if="userInfo.edit"/>
       <span v-else>{{ userInfo.url }}</span>
    </td>
    <td v-bind:class = tdClass>
       <Input type = "text" name="login" v-model="login" v-if="userInfo.edit"/>
       <span v-else>{{ userInfo.login }}</span>
    </td>
    <td v-bind:class = tdClass>
       <Input type = "password" name="password" v-model="password" v-if="userInfo.edit"/>
       <span v-else>{{ userInfo.password }}</span>
    </td>
    <td v-bind:class = tdClass>
        <Input type = "text" name="tags" v-model="tags" v-if="userInfo.edit"/>
        <span v-else></span>
    </td>
    <td v-bind:class = tdClass>
        <Textarea name="comments" v-model="userInfo.comment" v-if="userInfo.edit"/>
        <span v-else>{{ userInfo.comment }}</span>
    </td>
    <td v-bind:class = tdClass>
        <span >{{ userInfo.date }}</span>
    </td>
    <td v-bind:class = tdClass>
        <input type="checkbox" name="fav" value = "true" v-if="userInfo.edit">
        <span v-else></span>
    </td>
    <!-- <button v-on:click="saveEdit(userInfo.id)">Сохранить</button>-->
    <td v-if="userInfo.edit" v-bind:class = tdClass>
        <Button name="Сохранить" class='bg-green-600 text-white rounded-sm p-1' v-bind:onClick="()=>saveEdit(userInfo.id)" />
        
        <button>Отменить</button>
    </td>
</template>