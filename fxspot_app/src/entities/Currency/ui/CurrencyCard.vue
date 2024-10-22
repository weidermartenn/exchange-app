<template>
    <div class="bg-perfectgray rounded-lg gap-4 text-white flex flex-col p-4">
        <div class="flex flex-row gap-2 items-center justify-between">
            <p class="text-3xl before:content-['‣'] before:mr-2">AUD</p>
            <div class="p-2">
                <p class="text-2xl">64.62 → 65.00</p>
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <AppInput v-model="currencyRub" type="text" placeholder="RUB"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppInput from '@/shared/AppInput/ui/AppInput.vue';

import {ref} from 'vue';

const currencyRub = ref<string>('');

</script>

<style scoped>

</style>