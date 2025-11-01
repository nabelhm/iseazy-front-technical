import { Cloud } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CitySelector } from './components/CitySelector';
import { LanguageToggle } from './components/LanguageToggle';
import { WeatherDisplay } from './components/WeatherDisplay';
import { useCity } from './hooks/useCity';
import { useWeather } from './hooks/useWeather';

export const WeatherApp = () => {
  const { t } = useTranslation();
  const { selectedCity } = useCity();
  
  const { data, isLoading, error } = useWeather();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-sky-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <Cloud className="w-10 h-10 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              {t('weatherApp') || 'Weather App'}
            </h1>
          </div>
          <LanguageToggle />
        </header>

        <main className="max-w-6xl mx-auto">
          <CitySelector />
          
          <div className="text-center mb-4">
            <p className="text-lg text-muted-foreground">
              {selectedCity.name}
            </p>
          </div>
          
          <WeatherDisplay 
            data={data ?? null}
            loading={isLoading} 
            error={!!error}
          />
          
          {error && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive rounded-lg">
              <p className="text-destructive font-medium">
                {error.message}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};