<template>
    <div class="basis-1/3 h-full overflow-y-scroll shadow-md shadow-perfectgreen custom-scroll">
        <!-- Передаем новости в компонент NewsElement -->
        <div v-if="loading" class="h-full flex justify-center items-center">
            <div class="loader"></div>
        </div>
        <div v-else-if="error" class="h-full flex justify-center items-center text-red-500">
            {{ error }}
        </div>
        <news-element :newsList="newsList" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useNewsStore } from '@/widgets/NewsContainer/model/state';
import NewsElement from '@/entities/News/ui/NewsElement.vue';

// Получаем стор
const newsStore = useNewsStore();

const newsList = computed(() => newsStore.getNews);
const loading = computed(() => newsStore.getLoading);
const error = computed(() => newsStore.getError);

// Загружаем данные при монтировании компонента
onMounted(() => {
  newsStore.fetchNews();
});
</script>

<style scoped lang="scss">
@use '@/app/assets/customscroll.scss' as *;

.loader {
  border: 4px solid rgba(255, 255, 255, 0.3); /* Light grey */
  border-top: 4px solid white; /* White spinner */
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
