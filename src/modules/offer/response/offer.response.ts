import {Expose, Type} from 'class-transformer';
import { LocationType } from '../../../types/offer-type.js';
import { CityResponse } from './city.response.js';
import { HostResponse } from './host.response.js';
// import { UserType } from '../../../types/user-type.js';

export class OfferResponse {
  @Expose({name: '_id'})
  public offerId!: string;

  @Expose()
  public price!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public title!: string;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public type!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  @Type(() => CityResponse)
  public city!: CityResponse;

  @Expose()
  @Type(() => HostResponse)
  public hostId!: HostResponse;

  @Expose()
  public commentsCount!: number;

  @Expose()
  public bedrooms!: number;

  @Expose()
  public maxAdults!: number;

  @Expose()
  public description!: string;

  @Expose()
  public goods!: string[];

  @Expose()
  public images!: string[];

  @Expose()
  public location!: LocationType;

  @Expose()
  public createdDate!: string;
}
