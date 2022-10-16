import {Expose, Transform, Type} from 'class-transformer';
import { CityResponse } from './city.response.js';

export class FavoriteOffersResponse {
  @Expose({name: 'id'})
  public offerId!: string;

  @Expose()
  public price!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public title!: string;

  @Expose({name: 'isFavorite'})
  // @Type(() => string[])
  @Transform(({ value, obj  }) => value.includes(obj.hostId.id), { toClassOnly: true })
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
