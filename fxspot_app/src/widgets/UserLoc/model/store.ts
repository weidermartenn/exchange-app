import { defineStore } from "pinia";
import axios from 'axios';
import type { LocState } from "./LocState";

export const useLocStore = defineStore('loc', {
  state: (): LocState => ({
    weatherData: null,
    error: null,
    loading: true,
    countryCode: null,
    city: 'Неизвестный город',
    temp: '--',
  }),
  getters: {
    getWeatherData: (state) => state.weatherData,
    getError: (state) => state.error,
    getLoading: (state) => state.loading,
    getCountryCode: (state) => state.countryCode,
    getCity: (state) => state.city,
    getTemp: (state) => state.temp,
  },
  actions: {
    async fetchWeatherByIP() {
      this.loading = true;
      this.error = null; // Сброс ошибки перед новым запросом
      try {
        // Запрос гео по IP
        const ipResponse = await axios.get('https://ipapi.co/json/');
        const { latitude, longitude, country_code } = ipResponse.data;

        this.countryCode = country_code;

        // Запрос погоды по координатам
        const apiKey = '02586546b81e214ba2c5b751c986d399';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=ru&appid=${apiKey}`;

        const response = await axios.get(url);
        this.weatherData = response.data;
        this.city = response.data.name || 'Неизвестный город';
        this.temp = Math.round(response.data.main?.temp || '--');
      } catch (error: any) {
        this.error = 'Ошибка при загрузке данных о погоде';
      } finally {
        this.loading = false; // В любом случае останавливаем загрузку
      }
    }
  }
});
