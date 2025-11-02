import type { ForecastResponse, ForecastQueryParams } from '../types/weather';
import { HTTP_STATUS, WeatherAPIError } from '../constants/errors';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export async function getWeatherForecast(
  params: ForecastQueryParams
): Promise<ForecastResponse> {
  if (!API_KEY) {
    throw new WeatherAPIError('API_KEY_MISSING');
  }

  const { lat, lon, lang = 'en', units = 'metric', cnt } = params;

  const url = new URL(BASE_URL);
  url.searchParams.append('lat', lat.toString());
  url.searchParams.append('lon', lon.toString());
  url.searchParams.append('appid', API_KEY);
  url.searchParams.append('units', units);
  url.searchParams.append('lang', lang);
  
  if (cnt) {
    url.searchParams.append('cnt', cnt.toString());
  }

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      switch (response.status) {
        case HTTP_STATUS.UNAUTHORIZED:
          throw new WeatherAPIError('API_KEY_INVALID', HTTP_STATUS.UNAUTHORIZED);
        case HTTP_STATUS.NOT_FOUND:
          throw new WeatherAPIError('LOCATION_NOT_FOUND', HTTP_STATUS.NOT_FOUND);
        case HTTP_STATUS.TOO_MANY_REQUESTS:
          throw new WeatherAPIError('RATE_LIMIT', HTTP_STATUS.TOO_MANY_REQUESTS);
        default:
          throw new WeatherAPIError('UNKNOWN_ERROR', response.status);
      }
    }

    const data: ForecastResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof WeatherAPIError) {
      throw error;
    }

    if (error instanceof TypeError) {
  throw new WeatherAPIError('NETWORK_ERROR', undefined, error);
    }

  throw new WeatherAPIError('UNKNOWN_ERROR', undefined, error);
  }
}

export function getTodayForecasts(forecast: ForecastResponse) {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return forecast.list.filter((item) => item.dt_txt.startsWith(today));
}

export function groupForecastsByDay(forecast: ForecastResponse) {
  const grouped = new Map<string, typeof forecast.list>();
  
  for (const item of forecast.list) {
    const date = item.dt_txt.split(' ')[0];
    const existing = grouped.get(date) || [];
    grouped.set(date, [...existing, item]);
  }
  
  return grouped;
}

export function getTodayMinMax(forecast: ForecastResponse) {
  const today = getTodayForecasts(forecast);
  
  if (today.length === 0) {
    const first = forecast.list[0];
    return {
      temp_min: first.main.temp_min,
      temp_max: first.main.temp_max,
    };
  }
  
  const temps = today.map((item) => item.main.temp);
  return {
    temp_min: Math.min(...temps),
    temp_max: Math.max(...temps),
  };
}

export function getWeatherIconUrl(
  iconCode: string,
  size: '2x' | '4x' = '2x'
): string {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
}