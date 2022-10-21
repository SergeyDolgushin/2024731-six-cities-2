import {Exclude, Expose, Transform, Type} from 'class-transformer';
import { CityResponse } from './city.response.js';

export class OffersResponse {
  @Exclude()
  public currentUserId?: string;

  @Expose({name: 'id'})
  public offerId!: string;

  @Expose()
  public price!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public title!: string;

  @Expose({name: 'isFavorite'})
  @Type(() => String)
  @Transform(({ value, obj  }) => value.includes(obj.currentUserId), { toClassOnly: true })
  public isFavorite!: string;

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
