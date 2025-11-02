import { t } from "i18next";

interface ErrorMessageProps {
  error: Error;
  refetch: () => void;
}

export const ErrorMessage = ({ error, refetch }: ErrorMessageProps) => {
  let displayMessage = error.message;
  if (error.name === 'WeatherAPIError' && t(error.message) !== error.message) {
    displayMessage = t(error.message);
  }
  return (
    <div className="mt-4 p-4 bg-destructive/10 border border-destructive rounded-lg">
      <p className="text-destructive font-medium mb-2">
        {t('error')}: {displayMessage}
      </p>
      <button
        onClick={() => refetch()}
        className="text-sm text-primary hover:underline"
      >
        {t('retry') || 'Try again'}
      </button>
    </div>
  );
}