import {Expose} from 'class-transformer';
import { LocationType } from '../../../types/offer-type.js';

export class CityResponse {
  @Expose()
    _id!: string;

  @Expose()
    name!: string;

  @Expose()
    location!: LocationType;

}
