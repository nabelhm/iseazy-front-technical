import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/config';
import { WeatherApp } from './WeatherApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WeatherApp />
  </StrictMode>,
)
