/* eslint-disable react-refresh/only-export-components */
import type { City } from "../types/city";

export const CITIES: readonly City[] = [
  {
    id: 'London',
    name: 'London',
    coords: { lat: 51.5074, lon: -0.1278 },
  },
  {
    id: 'Toronto',
    name: 'Toronto',
    coords: { lat: 43.6532, lon: -79.3832 },
  },
  {
    id: 'Singapore',
    name: 'Singapore',
    coords: { lat: 1.3521, lon: 103.8198 },
  },
] as const;

export const DEFAULT_CITY = CITIES[0]; // London

export const getCityById = (cityId: string): City | undefined => {
  return CITIES.find((city) => city.id === cityId);
};

export const CITY_IDS = CITIES.map((city) => city.id);