import { Droplets, Wind } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ForecastItem } from '../types/weather';
import { Card } from './ui/card';

interface CurrentWeatherCardProps {
  current: ForecastItem;
  tempMin: number;
  tempMax: number;
}

export const CurrentWeatherCard = ({ current, tempMin, tempMax }: CurrentWeatherCardProps) => {
  const { t } = useTranslation();
  const weatherDescription = current.weather[0].description;

  return (
    <Card className="p-8 shadow-lg">
      <div className="flex items-center justify-between flex-wrap gap-6">
        <div className="flex items-center gap-6">
          <img
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
            alt={weatherDescription}
            className="w-32 h-32"
          />
          <div>
            <p className="text-6xl font-bold text-foreground">
              {Math.round(current.main.temp)}°C
            </p>
            <p className="text-xl text-muted-foreground capitalize mt-2">
              {weatherDescription}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              {t('humidity')}: {current.main.humidity}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              {t('windSpeed')}: {Math.round(current.wind.speed)} m/s
            </span>
          </div>
        </div>
      </div>

      {/* Temperaturas del día */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">{t('feelsLike')}</p>
          <p className="text-2xl font-semibold text-foreground">
            {Math.round(current.main.feels_like)}°C
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">{t('minTemp')}</p>
          <p className="text-2xl font-semibold text-foreground">
            {Math.round(tempMin)}°C
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">{t('maxTemp')}</p>
          <p className="text-2xl font-semibold text-foreground">
            {Math.round(tempMax)}°C
          </p>
        </div>
      </div>
    </Card>
  );
};