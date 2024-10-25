export interface AIState {
    loading: boolean;
    error: string | null;
    aiRequest: string | null;
    response: string | null;
}