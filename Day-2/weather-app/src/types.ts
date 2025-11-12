export interface WeatherAPIResponse {
  location: {
    name: string;
    region?: string;
    country?: string;
    lat?: number;
    lon?: number;
    tz_id?: string;
    localtime?: string;
  };
  current: {
    last_updated_epoch?: number;
    last_updated?: string;
    temp_c: number;
    temp_f?: number;
    is_day?: number;
    condition: { text: string; icon?: string; code?: number };
    wind_kph?: number;
    wind_mph?: number;
    humidity: number;
    cloud?: number;
    feelslike_c?: number;
    vis_km?: number;
  };
}