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
    condition_icon: null
  }),
  getters: {
    getWeatherData: (state) => state.weatherData,
    getError: (state) => state.error,
    getLoading: (state) => state.loading,
    getCountryCode: (state) => state.countryCode,
    getCity: (state) => state.city,
    getTemp: (state) => state.temp,
    getConditionIcon: (state) => state.condition_icon
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
        const apiKey = 'd0c69695c93247ebbee83252240410';
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&lang=ru&q=${latitude},${longitude}&days=1`;

        const response = await axios.get(url);
        this.weatherData = response.data;
        this.city = response.data.location?.name || 'Неизвестный город';
        this.temp = Math.round(response.data.current?.temp_c || '--');
        this.condition_icon = response.data.current?.condition?.icon || null;
        console.log(this.condition_icon)
      } catch (error: any) {
        this.error = 'Ошибка при загрузке данных о погоде';
      } finally {
        this.loading = false; // В любом случае останавливаем загрузку
      }
    }
  }
});
