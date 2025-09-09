<script setup lang="ts">
    import { useUsersStore } from '../../stores/users';
    import { ref, computed  } from 'vue'
    import FormInput from '../generic/FormInput.vue';
    import Button from '../ui/Button.vue';
    import PasswordInput from '../generic/PasswordInput.vue';

    import type { User } from '../../interfaces/user'; 

    const formName = ref<string>('name');
    const formUrl = ref<string>('url');
    const formLogin = ref<string>('login');
    const formPassword = ref<string>('password');
    const formTags = ref<string>('tags');
    const formComment = ref<string>('comments');
    const formCheckbox = ref<boolean>(false);

    //validation variables 
    const invalidField = ref<string>('');
    const validator = computed(() => {
        if(!formName.value){
            invalidField.value = 'name';
            return false;
        }
        else if(!formLogin.value){
            invalidField.value =  'login';
            return false;
        }
        else if(!formPassword.value){
            invalidField.value =  'password';
            return false;
        }   
        else{
            invalidField.value = '';
            return true;
        }   
            
    });

    const userStore = useUsersStore();
    
    function addUser(){

        let user: User = {
            id: 1,
            name: formName.value,
            url: formUrl.value,
            login: formLogin.value,
            password: formPassword.value,
            comment: formComment.value,
            tags: formTags.value,
            favorite: formCheckbox.value,
            date: new Date()
        };
        if(validateForm())
            userStore.addUser(user);
    }
    function validateForm(){
        if(validator.value)
            return true;
        else
            return false;
    }
    /*function displayPassword(){
        formPasswordVisible.value = !formPasswordVisible.value;
    }*/
</script>

<template>
    <div class="max-w-lg mx-auto">
        <div class="mb-1">
            <FormInput id="name" name="name" label="Название:" v-model="formName"/>
        </div> 
        <div class="mb-5">
            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert" v-if="invalidField === 'name'">
                Поле Название необходимо для заполнения! 
            </div>
        </div>

        <div class="mb-5">
            <FormInput id="url" name="url" label="URL:" v-model="formUrl"/>
        </div> 

        <div class="flex w-full gap-2">
            <div class="mb-1 w-1/2">
                <FormInput id="login" name="login" label="Логин:" v-model="formLogin"/>
            </div> 
            
            <div class="mb-1 w-1/2">
                <PasswordInput id="password" name="password" label="Пароль:" v-model="formPassword"/>
            </div> 
        </div>

        <div class="mb-5">
            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert" v-if="invalidField === 'login'">
                Поле Логин необходимо для заполнения! 
            </div>
            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert" v-if="invalidField === 'password'">
                Поле Пароль необходимо для заполнения! 
            </div>
        </div>
        
        <div class="mb-5">
            <FormInput id="tags" name="tags" label="Метки:" v-model="formTags"/>
        </div> 
        
        <div class="mb-5">
            <label for="comments" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Комментарии:</label>
            <textarea  id="comments" name="comments" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="formComment"></textarea>
        </div> 
        
        <div class="flex items-start mb-5">
            <div class="flex items-center h-5">
                <input id="favorite" type="checkbox" name="favorite" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" v-model="formCheckbox" />
            </div>
            <label for="favorite" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Избранное</label>
        </div>

        <Button class='bg-green-600 text-white rounded-sm p-2' name="Сохранить" :onClick="addUser"/>
    </div>
</template>