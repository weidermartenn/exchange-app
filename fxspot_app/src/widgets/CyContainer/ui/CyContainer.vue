<template>
  <div class="flex basis-1/2 md:basis-1/3 lg:basis-1/4 h-[600px] bg-semiaccent rounded-md inset-0 mx-auto shadow-lg shadow-perfectgreen overflow-x-scroll snap-x snap-mandatory custom-scroll">
    <div class="snap-center min-w-full h-full shrink-0 flex flex-col items-center py-4">
      <currency-card/>
    </div>
    <div class="snap-center min-w-full h-full shrink-0 bg-emerald-500"></div>
    <div class="snap-center min-w-full h-full shrink-0 bg-sky-700"></div>
  </div>
</template>

<script setup lang="ts">
import CurrencyCard from '@/entities/Currency/ui/CurrencyCard.vue';
</script>

<style scoped lang="scss">
@use '@/app/assets/customscroll.scss' as *;
</style>

