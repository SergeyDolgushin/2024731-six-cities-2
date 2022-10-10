import {Expose} from 'class-transformer';
import { LocationType } from '../../../types/offer-type.js';

export class CityResponse {
  @Expose()
    id!: string;

  @Expose()
    name!: string;

  @Expose()
    location!: LocationType;

}
