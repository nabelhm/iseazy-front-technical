import type { ForecastItem } from "../types/weather";
import { Card } from "./ui/card";

interface HourlyForecastCardProps {
  forecast: ForecastItem;
}

export const HourlyForecastCard = ({ forecast }: HourlyForecastCardProps) => {
  const time = new Date(forecast.dt * 1000);
  const hourStr = time.getHours().toString().padStart(2, '0') + ':00';
  const temp = Math.round(forecast.main.temp);
  const precipitationProbability = Math.round(forecast.pop * 100);

  return (
    <Card className="p-4 text-center shadow-md hover:shadow-lg transition-all">
      <p className="text-sm font-medium text-muted-foreground mb-2">
        {hourStr}
      </p>
      <img
        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
        alt={forecast.weather[0].description}
        className="w-12 h-12 mx-auto"
      />
      <p className="text-lg font-semibold text-foreground mt-2">
        {temp}°C
      </p>
      {forecast.pop > 0 && (
        <p className="text-xs text-muted-foreground mt-1">
          {precipitationProbability}% 💧
        </p>
      )}
    </Card>
  );
};