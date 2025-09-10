<script setup lang="ts">
    import { useUsersStore } from '../../stores/users';
    import { ref, onMounted, computed } from 'vue';
    import TableRow from '../generic/TableRow.vue';
    import Pagination from '../generic/Pagination.vue';

    const userStore = useUsersStore();
    const users = computed(() => userStore.getUsers);

    //style consts
    const thClass = "border border-gray-300 p-4 text-left font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-200";

    const editableUsers = ref<number[]>([0]);

    onMounted(() => {
        userStore.initialize();
        // Perform actions that require the component to be in the DOM,
        // such as fetching data or interacting with the DOM.
    });

    function deleteUser(id: number){
        userStore.removeUser(id);
    }

    function editUser(id: number){
        
        editableUsers.value.push(id);
        console.log(editableUsers.value);
    }
 
</script>

<template>
    <div class = "p-3">
        <template v-if="users.length > 0">
            <table class="m-auto border-collapse border border-gray-400 bg-white text-sm ">
                <thead class = "bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th v-bind:class=thClass>
                            ID
                        </th>
                        <th v-bind:class=thClass>
                            Название
                        </th>
                        <th v-bind:class=thClass>
                            URL
                        </th>
                        <th v-bind:class=thClass>
                            Логин
                        </th>
                        <th v-bind:class=thClass>
                            Пароль
                        </th>
                        <th v-bind:class=thClass>
                            Метки
                        </th>
                        <th v-bind:class=thClass>
                            Комментарий
                        </th>
                        <th v-bind:class=thClass>
                            Дата
                        </th>
                        <th v-bind:class=thClass>
                            Избранное
                        </th>
                        <th v-bind:class=thClass>
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" v-bind:key="user.id">
                        <TableRow 
                            :key = "user.id"
                            v-model:id="user.id" 
                            v-model:name="user.name"
                            v-model:url="user.url"
                            v-model:login="user.login"
                            v-model:password="user.password"
                            v-model:tags="user.tags"
                            v-model:comment="user.comment"
                            v-model:date="user.date"  
                            v-model:favorite="user.favorite"
                            v-model:editable="editableUsers"
                            v-bind:edit="editableUsers.includes(user.id)"
                            v-bind:editFunction="() => editUser(user.id)"
                            v-bind:deleteFunction="() => deleteUser(user.id)"/>
                        <td v-if="!editableUsers.includes(user.id)">
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination/>
        </template>
        <template v-else>
            <h2 class="text-slate-500">На данный момент, список пользователей пуст</h2>
        </template>
    </div>
</template>