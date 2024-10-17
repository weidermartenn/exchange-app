<template>
  <div class="min-h-screen font-ubuntu">
    <HeaderView/>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderView from '@/widgets/Header';

</script>

<style scoped>

</style>