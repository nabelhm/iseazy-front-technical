import { useTranslation } from 'react-i18next';
import type { ForecastItem } from '../types/weather';
import { HourlyForecastCard } from './HourlyForecastCard';

interface HourlyForecastListProps {
  forecasts: ForecastItem[];
}

export const HourlyForecastList = ({ forecasts }: HourlyForecastListProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-foreground">
        {t('hourlyForecast')}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {forecasts.map((forecast, index) => (
          <HourlyForecastCard key={`${forecast.dt}-${index}`} forecast={forecast} />
        ))}
      </div>
    </div>
  );
};