import {Expose, Type} from 'class-transformer';
import { CityResponse } from './city.response.js';

export class OffersResponse {
  @Expose({name: 'id'})
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

  @Expose({ name: 'city'})
  @Type(() => CityResponse)
  public city!: CityResponse;

  @Expose()
  public commentsCount!: number;

  @Expose()
  public createdDate!: string;
}
