// widgets/NewsContainer/model/state.ts
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
                const response = await axios.get(`https://newsdata.io/api/1/latest?apikey=${api_key}&language=ru`);

                // Пример обработки ответа, в зависимости от структуры возвращаемого API
                this.news = response.data.results.map((article: any) => ({
                    article_id: article.id,
                    title: article.title,
                    link: article.link,
                    pub_date: article.pubDate,
                    source_id: article.source_id
                }));
            } catch (error: any) {
                this.error = 'Произошла ошибка при загрузке новостей';
            } finally {
                this.loading = false;
            }
        }
    }
});
