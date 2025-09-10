<script setup lang="ts">
import DarkMode from '../generic/DarkMode.vue';
</script>

<template>
    <header class = "bg-slate-600 text-white flex justify-between gap-3 font-bold p-3">
        <div class="flex gap-4">
            <h1>UserApp</h1>
            <RouterLink to="/">Просмотреть список</RouterLink>
            <RouterLink to="/create">Создать пользователя</RouterLink>
        </div>
        <DarkMode/>
    </header>
</template>