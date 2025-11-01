import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex gap-2">
      <Button
        variant={i18n.language === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => i18n.changeLanguage('en')}
        className="transition-all"
      >
        EN
      </Button>
      <Button
        variant={i18n.language === 'es' ? 'default' : 'outline'}
        size="sm"
        onClick={() => i18n.changeLanguage('es')}
        className="transition-all"
      >
        ES
      </Button>
    </div>
  );
};
