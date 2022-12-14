import {DocumentType} from '@typegoose/typegoose';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import {OfferEntity} from './offer.entity.js';

export interface OfferServiceInterface extends DocumentExistsInterface{
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  find(count?: string): Promise<DocumentType<OfferEntity>[]>;
  findByOfferId(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  findPremiumOffers(city: string): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findFavorites(hostId: string): Promise<DocumentType<OfferEntity>[]>;
  updateFavoriteStatus(offerId: string, status: number, hostId: string): Promise<DocumentType<OfferEntity> | null>;
  changeCommentCountAndRating(offerId: string, rating: number): Promise<DocumentType<OfferEntity> | null>;
}
