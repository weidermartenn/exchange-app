import { defineStore } from 'pinia';
import axios from 'axios';

import type { AIState } from './AIState';

export const useAIStore = defineStore('ai', {
    state: (): AIState => ({
        loading: false,
        error: null,
        aiRequest: null,
        response: null
    }),
    getters: {
        getLoading: (state): boolean => state.loading,
        getError: (state): string | null => state.error,
        getAiRequest: (state): string | null => state.aiRequest,
        getResponse: (state): string | null => state.response
    },
    actions: {
        setAiRequest(request: string) {
            this.aiRequest = request;
        },
        async fetchResponse() {
            this.loading = true;
            console.log("API Key:", import.meta.env.VITE_OPENAI_API_KEY);
            try {
                const result = await axios.post(
                    'https://api.openai.com/v1/completions',
                    {
                        model: 'text-davinci-003',
                        prompt: this.aiRequest,
                        max_tokens: 100,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
                        }
                    }
                );
                

                this.response = result.data.choices[0].text.trim();
            } catch (error) {
                console.error(error);
                this.error = 'Произошла ошибка при обработке запроса';
            } finally {
                this.loading = false;
            }
        }
    }
});

