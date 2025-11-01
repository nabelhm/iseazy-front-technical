import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { useCity } from '../hooks/useCity';
import { CITIES } from '../constants/cities';

export const CitySelector = () => {
  const { t } = useTranslation();
  const { selectedCity, setSelectedCity } = useCity();

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <h2 className="text-lg font-medium text-muted-foreground">
        {t('selectCity')}
      </h2>
      <div className="flex gap-3 flex-wrap justify-center">
        {CITIES.map((city) => (
          <Button
            key={city.id}
            variant={selectedCity.id === city.id ? 'default' : 'outline'}
            onClick={() => setSelectedCity(city)}
            className="min-w-[120px] transition-all"
          >
            {t(city.id.toLowerCase())}
          </Button>
        ))}
      </div>
    </div>
  );
};