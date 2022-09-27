import { LocationType } from '../../../types/offer-type.js';

export default class UpdateOfferDto {
  price?: number;
  rating?: number;
  images?: string[];
  title?: string;
  offerId?: number;
  isFavorite?: boolean;
  isPremium?: boolean;
  type?: string;
  previewImage?: string;
  location?: LocationType;
  city?: string;
  goods?: string[];
  maxAdults?: number;
  hostId?: string;
  description?: string;
  bedrooms?: number;
  commentsCount?: number;
  createdDate?: Date;
}
