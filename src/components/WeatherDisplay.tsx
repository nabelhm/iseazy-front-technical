import { useTranslation } from 'react-i18next';

import { Cloud, Droplets, Wind } from 'lucide-react';
import { Card } from './ui/card';

interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{
      description: string;
      icon: string;
    }>;
  };
  daily: {
    temp: {
      min: number;
      max: number;
    };
  };
  hourly: Array<{
    dt: number;
    temp: number;
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
}

interface WeatherDisplayProps {
  data: WeatherData | null;
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

  if (error || !data) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-destructive">{t('error')}</p>
      </div>
    );
  }

  const weatherDescription = data.current.weather[0].description;

  return (
    <div className="space-y-6">
      <Card className="p-8 shadow-lg bg-linear-to-br from-card to-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img
              src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`}
              alt={weatherDescription}
              className="w-32 h-32"
            />
            <div>
              <p className="text-6xl font-bold text-foreground">
                {Math.round(data.current.temp)}°C
              </p>
              <p className="text-xl text-muted-foreground capitalize mt-2">
                {weatherDescription}
              </p>
            </div>
          </div>
          <div className="text-right space-y-2">
            <div className="flex items-center gap-2 justify-end">
              <Droplets className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                {t('humidity')}: {data.current.humidity}%
              </span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <Wind className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                {t('windSpeed')}: {Math.round(data.current.wind_speed)} m/s
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{t('feelsLike')}</p>
            <p className="text-2xl font-semibold text-foreground">
              {Math.round(data.current.feels_like)}°C
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{t('minTemp')}</p>
            <p className="text-2xl font-semibold text-foreground">
              {Math.round(data.daily.temp.min)}°C
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{t('maxTemp')}</p>
            <p className="text-2xl font-semibold text-foreground">
              {Math.round(data.daily.temp.max)}°C
            </p>
          </div>
        </div>
      </Card>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-foreground">{t('hourlyForecast')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.hourly.slice(0, 12).map((hour, index) => {
            const time = new Date(hour.dt * 1000);
            const hourStr = time.getHours().toString().padStart(2, '0') + ':00';
            
            return (
              <Card key={index} className="p-4 text-center shadow-md hover:shadow-lg transition-all">
                <p className="text-sm font-medium text-muted-foreground mb-2">{hourStr}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                  alt={hour.weather[0].description}
                  className="w-12 h-12 mx-auto"
                />
                <p className="text-lg font-semibold text-foreground mt-2">
                  {Math.round(hour.temp)}°C
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
