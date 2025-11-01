import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { getWeatherForecast } from '../api/weather';
import type { ForecastResponse } from '../types/weather';
import { useCity } from './useCity';

export function useWeather() {
  const { selectedCity } = useCity();
  const { i18n } = useTranslation();

  return useQuery<ForecastResponse, Error>({
    queryKey: ['weather', 'forecast', selectedCity.id, i18n.language],
    
    queryFn: () =>
      getWeatherForecast({
        lat: selectedCity.coords.lat,
        lon: selectedCity.coords.lon,
        lang: i18n.language,
        units: 'metric',
        // cnt: 16, // Opcional: solo pedir 16 timestamps (2 días)
      }),
    staleTime: 1000 * 60 * 30, // 30 minutos
    gcTime: 1000 * 60 * 60 * 2, // 2 horas
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}