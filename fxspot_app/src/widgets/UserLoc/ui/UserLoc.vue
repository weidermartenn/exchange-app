<template>
  <div class="rounded-md p-2 text-white" :style="{ width: containerWidth }">
    <!-- Ошибка -->
    <div v-if="error" class="h-full gap-2 flex justify-center items-center text-red-500">
      <i class="fa-solid fa-xmark text-xl"></i>
      {{ error }}
    </div>

    <!-- Загрузка -->
    <div v-else-if="loading" class="h-full flex justify-center items-center px-20">
      <div class="loader"></div>
    </div>

    <!-- Данные о погоде -->
    <div v-if="weatherData && !loading && !error" class="flex flex-row gap-10 justify-between items-center px-2">
      <div ref="cityContainer" class="flex flex-col">
        <div class="flex flex-row gap-2 items-center">
          <img v-if="countryCode" :src="`https://flagcdn.com/16x12/${countryCode.toLowerCase()}.png`" :alt="countryCode" />
          <p>{{ city }}</p>
        </div>
        <div class="flex flex-row items-center gap-2">
          <i class="fa-solid fa-temperature-three-quarters"></i>
          <p v-if="temp !== '--'" class="flex flex-row justify-center items-center">
            {{ temp }}°C
            <img :src="condition_icon" :alt="condition_icon" class="w-16 -my-4"/>
          </p>
          <p v-else>Температура неизвестна</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, toRefs } from 'vue';
import { useLocStore } from '@/widgets/UserLoc/model/store';

const locStore = useLocStore();
const { weatherData, loading, error, countryCode, city, temp, condition_icon } = toRefs(locStore);
const containerWidth = ref('auto');
const cityContainer = ref<HTMLElement | null>(null);
let resizeObserver: ResizeObserver | null = null;

const setupResizeObserver = () => {
  if (cityContainer.value) {
    resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.contentRect) {
          containerWidth.value = `${entry.contentRect.width + 40}px`;
        }
      }
    });
    resizeObserver.observe(cityContainer.value);
  }
};

onBeforeUnmount(() => {
  if (resizeObserver && cityContainer.value) {
    resizeObserver.unobserve(cityContainer.value);
  }
});

onMounted(() => {
  locStore.fetchWeatherByIP();
  setupResizeObserver();
});
</script>

<style scoped>
.loader {
  border: 4px solid rgba(255, 255, 255, 0.3); /* Light grey */
  border-top: 4px solid white; /* White spinner */
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
