<template>
    <div class="sticky flex gap-6 items-center top-0 py-4 px-6 w-full h-[75px] bg-main border-b-2 border-semiaccent">
        <router-link to="/">
            <p class="text-3xl text-white">FXSpot</p>
        </router-link>
        <UserLoc />
    </div>
</template>

<script setup lang="ts">
import UserLoc from '@/widgets/UserLoc';
</script>

<style scoped>

</style>