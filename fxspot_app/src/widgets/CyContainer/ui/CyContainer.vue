<template>
    <div class="flex basis-2/3 md:basis-5/6 lg:basis-1/2 h-[600px] bg-semiaccent rounded-md inset-0 mx-auto shadow-lg shadow-perfectgreen overflow-x-scroll snap-x snap-mandatory custom-scroll">
        <div class="snap-center min-w-full h-full shrink-0 bg-amber-200"></div>
        <div class="snap-center min-w-full h-full shrink-0 bg-emerald-500"></div>
        <div class="snap-center min-w-full h-full shrink-0 bg-sky-700"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  .custom-scroll::-webkit-scrollbar {
    width: 12px;
    height: 16px; 
  }
  
  .custom-scroll::-webkit-scrollbar-track {
    background-color: #2e2e2e; 
    border-radius: 10px;
  }
  
  .custom-scroll::-webkit-scrollbar-thumb {
    background-color: #80d977;
    border-radius: 10px;
    border: 3px solid transparent; 
    background-clip: padding-box;
  }
  
  .custom-scroll::-webkit-scrollbar-thumb:hover {
    background-color: #66c764;
  }

  .custom-scroll {
    scrollbar-width: 20px;
    scrollbar-color: #80d977 #2e2e2e;
  }
  </style>
  