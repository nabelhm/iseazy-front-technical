import React, { useState, type ReactNode } from 'react';
import { CityContext } from './CityContext';
import { DEFAULT_CITY } from '../constants/cities';
import type { City } from '../types/city';

interface CityProviderProps {
  children: ReactNode;
}

export const CityProvider: React.FC<CityProviderProps> = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState<City>(DEFAULT_CITY);

  const value = {
    selectedCity,
    setSelectedCity,
  };

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
};