export const ERROR_MESSAGES = {
  API_KEY_MISSING: 'VITE_OPENWEATHER_API_KEY is not defined. Please add it to your .env file.',
  API_KEY_INVALID: 'Invalid API key. Please check your VITE_OPENWEATHER_API_KEY.',
  LOCATION_NOT_FOUND: 'Location not found.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
} as const;

export class WeatherAPIError extends Error {
  public statusCode: number | undefined;
  public originalError: unknown;

  constructor(
    message: string,
    statusCode?: number,
    originalError?: unknown
  ) {
    super(message);
    this.name = 'WeatherAPIError';
    this.statusCode = statusCode;
    this.originalError = originalError;
  }
}
