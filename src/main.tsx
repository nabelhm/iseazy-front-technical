import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/config';
import { WeatherApp } from './WeatherApp'
import { CityProvider } from './context/CityProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CityProvider>
      <WeatherApp />
    </CityProvider>
  </StrictMode>,
)
