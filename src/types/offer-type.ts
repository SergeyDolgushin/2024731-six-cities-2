import { UserType } from './user-type.js';

export type LocationType = {
  latitude: number
  longitude: number
};

export type CityType = {
  location: LocationType,
  name: string
};

export type OfferType = {
  price: number,
  rating: number,
  images: string[],
  title: string,
  id: number,
  isFavorite: boolean
  isPremium: boolean,
  type: string,
  previewImage: string,
  location: LocationType,
  city: CityType,
  goods: string[],
  maxAdults: number,
  host: UserType,
  description: string,
  bedrooms: number,
  commentsCount: number,
  createdDate: Date
};


