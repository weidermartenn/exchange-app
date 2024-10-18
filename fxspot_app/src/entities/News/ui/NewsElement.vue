<template>
    <div class="h-full flex flex-col justify-start items-start p-4 text-sm text-white">
        <div v-if="newsList.length">
            <div v-for="news in newsList" :key="news.article_id" class="flex flex-col gap-2 px-4 py-2 rounded-md bg-zinc-800 mb-4">
                <p>{{ news.pub_date }}</p>
                <h2 class="text-lg">{{ news.title }}</h2>
                <p>Источник: {{ news.source_id }}</p>
                <a :href="news.link" target="_blank" class="bg-perfectgreen p-2 rounded-md w-[120px]">Читать новость</a>          
            </div>
        </div>
        <div v-else>
            <p>Новости отсутствуют.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { News } from '@/entities/News/model/news';

// Принимаем данные через пропсы
const props = defineProps<{
  newsList: News[];
}>();
</script>

<style scoped lang="scss">

</style>
