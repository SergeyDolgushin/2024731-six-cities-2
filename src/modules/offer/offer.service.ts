import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import {OfferServiceInterface} from './offer-service.interface.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {Component} from '../../types/component.types.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { DEFAULT_COUNT, DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_OFFER_COUNT, DEFAULT_RATING, SortType } from './offer-constant.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {

    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['hostId', 'city'])
      .exec();
  }

  public async find(count?: string): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find({},{},{limit: Number(limit)})
      .populate(['hostId', 'city'])
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['hostId', 'city'])
      .exec();
  }

  public async findPremiumOffers(city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({city: city},{},{limit: DEFAULT_PREMIUM_OFFER_COUNT})
      .sort({createdAt: SortType.Down})
      .populate(['hostId', 'city'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async findFavorites(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({isFavorite: true})
      .populate(['hostId', 'city'])
      .exec();
  }

  public async updateFavoriteStatus(offerId: string, status: number): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {isFavorite: Boolean(status)}, {new: true})
      .populate(['hostId', 'city'])
      .exec();
  }

  public async changeCommentCountAndRating(offerId: string, rating: number): Promise<DocumentType<OfferEntity> | null> {
    const currentOffer = await this.offerModel.findById(offerId).exec();
    const currentRating = (currentOffer) ? (currentOffer.rating) : DEFAULT_RATING;
    const currentCount = (currentOffer) ? (currentOffer.commentsCount) : DEFAULT_COUNT;

    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {commentsCount: 1},
        rating: ((currentRating * currentCount) + rating) / (currentCount + 1)}).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}
