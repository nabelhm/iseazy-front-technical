import { createContext } from 'react';
import type { City } from '../types/city';

export interface CityContextType {
  selectedCity: City;
  setSelectedCity: (city: City) => void;
}

export const CityContext = createContext<CityContextType | undefined>(undefined);