
export interface Coordinates {
  lat: number;
  lon: number;
}

export interface City {
  id: string;
  name: string;
  coords: Coordinates;
}

export type CityId = 'London' | 'Toronto' | 'Singapore' | 'La Habana';