import { CityType, LocationType } from './offer-type.js';

export type MockType = {
  price: number,
  rating: number,
  images: string[],
  titles: string[],
  id: number,
  isFavorite: boolean
  isPremium: boolean,
  types: string[],
  previewImages: string[],
  location: LocationType,
  city: CityType,
  goods: string[],
  maxAdults: number,
  hostName: string[],
  hostEmail: string[],
  hostPassword: string[],
  hostAvatar: string[],
  hostIsPro: string,
  descriptions: string[],
  bedrooms: number,
  commentsCount: number,
};
