import {CityType, LocationType} from '../../types/offer-type.js';
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';

const {prop, modelOptions} = typegoose;

export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities'
  }
})

export class CityEntity extends defaultClasses.TimeStamps implements CityType {
  constructor(data: CityType) {
    super();

    this.name = data.name;
    this.location = data.location;
  }

  @prop({ unique: true, required: true })
  public name!: string;

  @prop({required: true})
  public location!: LocationType;

}

export const CityModel = getModelForClass(CityEntity);
