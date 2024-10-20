<template>
    <div class="basis-1/4 h-full overflow-y-scroll shadow-md shadow-perfectgreen custom-scroll text-white">
        <!-- Передаем новости в компонент NewsElement -->
        <div v-if="loading" class="h-full flex justify-center items-center">
            <div class="loader"></div>
        </div>
        <div v-else-if="error" class="h-full flex flex-col justify-center items-center text-red-500">
            <i class="fa-solid fa-xmark text-red-800 text-7xl"></i>
            {{ error }}
        </div>
        <div v-else>
          <p class="text-center py-2">Последнее обновление: {{ formattedLastUpdated }}</p>
          <transition-group name="list" tag="div">
            <news-element v-for="news in newsList" :key="news.article_id" :news="news"/>
          </transition-group>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useNewsStore } from '@/widgets/NewsContainer/model/state';
import NewsElement from '@/entities/News/ui/NewsElement.vue';

// Получаем стор
const newsStore = useNewsStore();

// Reactively storing the last update time
const lastUpdated = ref<Date | null>(null);

// Computed properties for news, loading state, and errors
const newsList = computed(() => newsStore.getNews);
const loading = computed(() => newsStore.getLoading);
const error = computed(() => newsStore.getError);

// Formatting the last updated time to a readable format
const formattedLastUpdated = computed(() => {
  if (lastUpdated.value) {
    return new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(lastUpdated.value);
  }
  return 'нет данных'; // Default text if no update has occurred yet
});

// Function to fetch news and update the lastUpdated time
const fetchNewsAndUpdateTime = () => {
  newsStore.fetchNews();
  lastUpdated.value = new Date(); // Update the time to current
};

// Fetch news when component is mounted and set up periodic refresh
onMounted(() => {
  fetchNewsAndUpdateTime(); // Fetch news immediately

  // const intervalId = setInterval(() => {
  //   fetchNewsAndUpdateTime(); // Fetch news and update time every 60 seconds
  // }, 60000);

  // // Clear interval on unmount to avoid memory leaks
  // onUnmounted(() => {
  //   clearInterval(intervalId);
  // });
});
</script>

<style scoped lang="scss">
@import '@/app/assets/customscroll.scss';

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

.list-move, .list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
