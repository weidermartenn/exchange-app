export interface LocState {
    weatherData: any | null;
    error: string | null;
    loading: boolean;
    countryCode: string | null;
    city: string;
    temp: number | '--';
}