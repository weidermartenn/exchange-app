<template>
    <div class="rounded-md p-2 text-white" :style="{ width: containerWidth }">
      <div v-if="error" class="h-full flex justify-center items-center text-red-500">{{ error }}</div>
      
      <div v-if="loading" class="h-full flex justify-center items-center">
        <div class="loader"></div>
      </div>
      
      <div v-if="weatherData && !loading" class="flex flex-row gap-10 justify-between items-center px-2">
        <div ref="cityContainer" class="flex flex-col">
            <div class="flex flex-row gap-2 items-center">
                <img v-if="countryCode" :src="`https://flagcdn.com/16x12/${countryCode.toLowerCase()}.png`" 
                    :alt="countryCode"/>
                <p>{{ city }}</p>
            </div>
            <div class="flex flex-row items-center gap-2">
                <i class="fa-solid fa-temperature-three-quarters"></i>
                <p>{{ roundedTemperature }}°C</p>
            </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import axios from 'axios';

// Ссылки на данные
const weatherData = ref<any>(null);
const error = ref<string | null>(null);
const loading = ref(true);  // Состояние загрузки
const countryCode = ref<string | null>(null); // Код страны
const containerWidth = ref<string>('auto'); // Ширина основного дива

// Получаем ссылку на элемент, содержащий город и флаг
const cityContainer = ref<HTMLElement | null>(null);
let resizeObserver: ResizeObserver | null = null;

// Геттер для округлённой температуры
const roundedTemperature = computed(() => {
  return weatherData.value?.main?.temp ? Math.round(weatherData.value.main.temp) : '--';
});

// Геттер для названия города
const city = computed(() => {
  return weatherData.value?.name ? weatherData.value.name : 'Неизвестный город';
});

// Функция для получения данных о погоде через IP-адрес
async function fetchWeatherByIP() {
  try {
    // Сначала получаем геолокацию по IP
    const ipResponse = await axios.get('https://ipapi.co/json/'); // Это может быть другой IP-геолокационный сервис
    const { latitude, longitude, country_code } = ipResponse.data;

    // Сохраняем код страны
    countryCode.value = country_code;

    console.log('Геолокация по IP получена:', { latitude, longitude, country_code });

    // Теперь делаем запрос к OpenWeatherMap API
    const apiKey = '02586546b81e214ba2c5b751c986d399'; // Вставь свой ключ от OpenWeatherMap API
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=ru&appid=${apiKey}`;

    const response = await axios.get(url);
    weatherData.value = response.data;
    loading.value = false; // Данные загружены, скрываем спиннер
  } catch (err) {
    error.value = 'Ошибка при загрузке данных о погоде';
    loading.value = false; // Останавливаем загрузку в случае ошибки
  }
}

// Настройка ResizeObserver для отслеживания изменений ширины
function setupResizeObserver() {
  if (cityContainer.value) {
    resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.contentRect) {
          containerWidth.value = `${entry.contentRect.width + 40}px`; // Добавляем немного отступов
        }
      }
    });
    resizeObserver.observe(cityContainer.value);
  }
}

// Удаление ResizeObserver при размонтировании компонента
onBeforeUnmount(() => {
  if (resizeObserver && cityContainer.value) {
    resizeObserver.unobserve(cityContainer.value);
  }
});

// Получение данных о погоде при монтировании
onMounted(() => {
  fetchWeatherByIP();
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
