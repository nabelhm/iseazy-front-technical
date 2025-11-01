import { Cloud, Droplets, Wind } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getTodayMinMax } from '../api/weather';
import type { ForecastResponse } from '../types/weather';
import { Card } from './ui/card';

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
  const weatherDescription = current.weather[0].description;
  
  const { temp_min, temp_max } = getTodayMinMax(data);
  const hourlyForecasts = data.list.slice(0, 12);

  return (
    <div className="space-y-6">
      {/* Card principal con clima actual */}
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
              {Math.round(temp_min)}°C
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{t('maxTemp')}</p>
            <p className="text-2xl font-semibold text-foreground">
              {Math.round(temp_max)}°C
            </p>
          </div>
        </div>
      </Card>

      {/* Pronóstico por horas */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          {t('hourlyForecast')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {hourlyForecasts.map((forecast, index) => {
            const time = new Date(forecast.dt * 1000);
            const hourStr = time.getHours().toString().padStart(2, '0') + ':00';
            
            return (
              <Card 
                key={index} 
                className="p-4 text-center shadow-md hover:shadow-lg transition-all"
              >
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {hourStr}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                  alt={forecast.weather[0].description}
                  className="w-12 h-12 mx-auto"
                />
                <p className="text-lg font-semibold text-foreground mt-2">
                  {Math.round(forecast.main.temp)}°C
                </p>
                {/* Probabilidad de precipitación */}
                {forecast.pop > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.round(forecast.pop * 100)}% 💧
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};