import {LocationType} from '../../types/offer-type.js';
import typegoose, {getModelForClass, defaultClasses, Ref} from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { CityEntity } from '../city/city.entity.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends defaultClasses.TimeStamps {

  @prop({ required: true })
  public price!: number;

  @prop({required: true, default: 0})
  public rating!: number;

  @prop({default: ''})
  public images!: string[];

  @prop({required: true})
  public title!: string;

  @prop({required: true})
  public offerId!: number;

  @prop({required: true})
  public isFavorite!: string[];

  @prop({required: true})
  public isPremium!: boolean;

  @prop({required: true})
  public type!: string;

  @prop({default: ''})
  public previewImage!: string;

  @prop({required: true})
  public location!: LocationType;

  @prop({
    ref: CityEntity,
    required: true
  })
  public city!: Ref<CityEntity>;

  @prop({required: true})
  public goods!: string[];

  @prop({required: true})
  public maxAdults!: number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public hostId!: Ref<UserEntity>;

  @prop({required: true})
  public description!: string;

  @prop({required: true})
  public bedrooms!: number;

  @prop({required: true})
  public commentsCount!: number;

  @prop({required: true})
  public createdDate!: Date;

  @prop({required: false})
  public currentUserId?: string;
}

export const OfferModel = getModelForClass(OfferEntity);
