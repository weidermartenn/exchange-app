<template>
    <div class="sticky flex justify-between gap-6 top-0 py-4 px-6 w-full h-[75px] bg-main border-b-2 border-semiaccent">
        <div class="flex flex-row items-center gap-4">
            <router-link to="/">
                <p class="text-3xl text-white">FXSpot</p>
            </router-link>
            <UserLoc />
        </div>
        <div class="flex flex-row items-center gap-4">
            <a class="fa-brands fa-github text-3xl text-white" href="https://github.com/weidermartenn/exchange-app" target="_blank"></a>
            <i class="fa-solid fa-microchip text-xl text-white">apis</i>
        </div>
    </div>
</template>

<script setup lang="ts">
import UserLoc from '@/widgets/UserLoc';
</script>

<style scoped>

</style>