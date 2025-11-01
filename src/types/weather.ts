export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Clouds {
  all: number;
}

export interface Rain {
  '3h'?: number;
}

export interface Snow {
  '3h'?: number;
}

export interface Sys {
  pod: string;
}

export interface ForecastItem {
  dt: number;
  main: MainWeatherData;
  weather: WeatherCondition[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  snow?: Snow;
  sys: Sys;
  dt_txt: string;
}

export interface CityInfo {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}


export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: CityInfo;
}

export interface ForecastQueryParams {
  lat: number;
  lon: number;
  lang?: string;
  units?: 'metric' | 'imperial' | 'standard';
  cnt?: number;
}

export interface DailyForecast {
  date: string;
  items: ForecastItem[];
  tempMin: number;
  tempMax: number;
  weatherConditions: WeatherCondition[];
}