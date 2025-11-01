import { useTranslation } from 'react-i18next';
import { Cloud } from 'lucide-react';
import { CitySelector } from './components/CitySelector';
import { LanguageToggle } from './components/LanguageToggle';

export const WeatherApp = () => {
  const { t } = useTranslation();

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
        </main>
      </div>
    </div>
  );
};