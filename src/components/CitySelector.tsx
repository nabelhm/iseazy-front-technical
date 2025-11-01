import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const cities = [
  { id: 'London', coords: { lat: 51.5074, lon: -0.1278 } },
  { id: 'Toronto', coords: { lat: 43.6532, lon: -79.3832 } },
  { id: 'Singapore', coords: { lat: 1.3521, lon: 103.8198 } }
];

export const CitySelector = ({ selectedCity, onCityChange }: CitySelectorProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <h2 className="text-lg font-medium text-muted-foreground">{t('selectCity')}</h2>
      <div className="flex gap-3 flex-wrap justify-center">
        {cities.map((city) => (
          <Button
            key={city.id}
            variant={selectedCity === city.id ? 'default' : 'outline'}
            onClick={() => onCityChange(city.id)}
            className="min-w-[120px] transition-all"
          >
            {t(city.id.toLowerCase())}
          </Button>
        ))}
      </div>
    </div>
  );
};

export { cities };
