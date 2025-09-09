<script setup lang="ts">
    import { useUsersStore } from '../../stores/users';
    import { /*ref,*/ defineProps } from 'vue';
    //import type { User } from '../../interfaces/user'; 
    import Button from '../ui/Button.vue';
    import ButtonIcon from '../ui/ButtonIcon.vue';
    import Input from '../ui/Input.vue';
    import Textarea from '../ui/Textarea.vue';

    //const edit = ref(false);

    const userInfo = defineProps<{
        id: number
        name?: string
        url?: string
        login?: string
        password?: string
        date: Date
        tags?: string
        comment?: string
        favorite?: boolean
        edit?: boolean
        editFunction: (event?: Event, ...args: any[]) => void
        deleteFunction: (event?: Event, ...args: any[]) => void
    }>();

    const name = defineModel('name');
    const url = defineModel('url');
    const login = defineModel('login');
    const password = defineModel('password');
    const tags = defineModel('tags');
    //const comment = defineModel('comment');
    const favorite = defineModel('favorite');
    //const edit:  = defineModel('url');

    const editableUsers = defineModel<number[]>('editable');

    const userStore = useUsersStore();

    const tdClass = "border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400";

    function saveEdit(id: number){
        userStore.editUser();
        if(editableUsers.value)
            editableUsers.value = editableUsers.value.filter(user => user !== id);
    }

    function editHandler(){
        userInfo.editFunction();
    }
    function deleteHandler(){
        userInfo.deleteFunction();
    }

    function showTags(tags: string | undefined): Array<string> | string{
        let arr, arr2 = [] as string[];
        if(tags && tags.length !== 0)
        {
            arr = tags.split(";");
            arr.forEach( (value) => {
                arr2.push(value.trim());
            });
        }
        else 
           return "no tags found";
        return arr2;
    }
</script>


<template>
    <td v-bind:class = tdClass>
       <span >{{ userInfo.id }} </span>
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
       <span v-else> ******** </span>
    </td>
    <td v-bind:class = tdClass>
        <Input type = "text" name="tags" v-model="tags" v-if="userInfo.edit"/>
        <div class="flex gap-2" v-else>
            <span v-for="item in showTags(userInfo.tags)" class = "bg-slate-800 p-1 text-white rounded-sm">
                {{ item }}
            </span>
        </div>
    </td>
    <td v-bind:class = tdClass>
        <Textarea name="comments" v-model="userInfo.comment" v-if="userInfo.edit"/>
        <span v-else>{{ userInfo.comment }}</span>
    </td>
    <td v-bind:class = tdClass>
        <span >{{ userInfo.date }}</span>
    </td>
    <td v-bind:class = tdClass>
        <input type="checkbox" name="favorite" v-model="favorite" v-if="userInfo.edit">
        <template v-else >
            <span v-if="userInfo.favorite">
                Избранное
            </span>
            <span v-else>
                -
            </span>
        </template>
        
    </td>
    <!-- <button v-on:click="saveEdit(userInfo.id)">Сохранить</button>-->
    <td v-if="userInfo.edit" v-bind:class = tdClass>
        <Button name="Сохранить" class='bg-green-600 text-white rounded-sm p-1' v-bind:onClick="()=>saveEdit(userInfo.id)" />
        <button>Отменить</button>
    </td>
    <td v-else v-bind:class = tdClass>
        <!-- <Button name="Редактировать" class="bg-blue-500 text-white rounded-sm p-1" type = "error"  v-bind:onClick="() => editHandler()"/> -->
        <ButtonIcon icon="mdi:account-edit-outline" class='bg-blue-500 text-white rounded-sm p-1' v-bind:onClick="()=>editHandler()"/>
        <ButtonIcon icon="mdi:trash-can" class='bg-red-500 text-white rounded-sm p-1 ml-3' v-bind:onClick="()=>deleteHandler()"/>
    </td>
</template>