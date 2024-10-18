import type { News } from '@/entities/News/model/news';

export interface NewsState {
    news = News[],
    loading: boolean,
    error: string | null,
}