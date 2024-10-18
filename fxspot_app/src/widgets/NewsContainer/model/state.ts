import { defineStore } from "pinia";
import axios from 'axios';

import type { NewsState } from "@/widgets/NewsContainer/model/NewsState";
import type { News } from "@/entities/News/model/news";

export const useNewsStore = defineStore('news', {
    state: (): NewsState => ({
        news: [],
        loading: false,
        error: null
    }),
    getters: {
        getNews: (state): News[] => state.news,
        getLoading: (state): boolean => state.loading,
        getError: (state): string | null => state.error
    },
    actions: {
        async fetchNews() {
            this.loading = true;
            try {
                const api_key = 'pub_565703e88ed48eca4c4bd18daa051801872a6';
                const response = await axios.get<News[]>(`https://newsdata.io/api/1/latest?apikey=${api_key}&language=ru`);
                this.news = response.data;
            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        }
    }
})