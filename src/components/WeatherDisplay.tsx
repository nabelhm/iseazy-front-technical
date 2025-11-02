import { Cloud } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getTodayMinMax } from '../api/weather';
import type { ForecastResponse } from '../types/weather';
import { CurrentWeatherCard } from './CurrentWeatherCard';
import { HourlyForecastList } from './HourlyForecastList';

interface WeatherDisplayProps {
  data: ForecastResponse | null;
  loading: boolean;
  error: boolean;
}

export const WeatherDisplay = ({ data, loading, error }: WeatherDisplayProps) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Cloud className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !data || !data.list || data.list.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-destructive">{t('error')}</p>
      </div>
    );
  }

  const current = data.list[0];
  const { temp_min, temp_max } = getTodayMinMax(data);
  const hourlyForecasts = data.list.slice(0, 12);

  return (
    <div className="space-y-6">
      <CurrentWeatherCard 
        current={current} 
        tempMin={temp_min} 
        tempMax={temp_max} 
      />
      <HourlyForecastList forecasts={hourlyForecasts} />
    </div>
  );
};