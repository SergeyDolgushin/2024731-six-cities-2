import { LocationType } from '../../../types/offer-type.js';
import { IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, Matches,
  Max, MaxLength, Min, MinLength, Validate} from 'class-validator';
import { GoodsType } from '../../../types/goods-types.enum.js';
import { HouseType } from '../../../types/house-types.enum.js';
import LocationValidator from '../../../common/validator/location-validator.js';
import { MAX_ADULTS, MAX_DESCRIPTION, MAX_PRICE, MAX_ROOMS, MAX_TITLE,
  MIN_ADULTS, MIN_DESCRIPTION, MIN_PRICE, MIN_ROOMS, MIN_TITLE } from '../offer-constant.js';

export default class CreateOfferDto {
  @IsInt({message: 'Price must be an integer'})
  @Min(MIN_PRICE, {message: `Minimum price is ${MIN_PRICE}`})
  @Max(MAX_PRICE, {message: `Maximum price is ${MAX_PRICE}`})
  public price!: number;

  @MinLength(MIN_TITLE, {message: `Minimum title length must be ${MIN_TITLE}`})
  @MaxLength(MAX_TITLE, {message: `Maximum title length must be ${MAX_TITLE}`})
  public title!: string;

  public offerId!: number;

  @IsArray({ message: 'Features must be an array' })
  public isFavorite!: string[];

  @IsBoolean()
  public isPremium!: boolean;

  @IsEnum(HouseType, { message: 'Type must be Apartment, House, Room or Hotel' })
  public type!: string;

  @Matches(/[\w/-]+.(jpg|png)/, { message: 'Photo must be jpg or png' })
  public previewImage!: string;

  @Validate(LocationValidator, {message: 'Invalid location value'})
  public location!: LocationType;

  @IsMongoId({message: 'city field must be valid an id'})
  public city!: string;

  @IsArray({ message: 'Features must be an array' })
  @IsEnum(GoodsType, { each: true, message: 'Features must be from suggested list' })
  public goods!: string[];

  @IsInt({message: 'Price must be an integer'})
  @Min(MIN_ADULTS, {message: `Minimum adults is ${MIN_ADULTS}`})
  @Max(MAX_ADULTS, {message: `Maximum adults is ${MAX_ADULTS}`})
  public maxAdults!: number;

  public hostId!: string;

  @MinLength(MIN_DESCRIPTION, {message: `Minimum description length must be ${MIN_DESCRIPTION}`})
  @MaxLength(MAX_DESCRIPTION, {message: `Maximum description length must be ${MAX_DESCRIPTION}`})
  public description!: string;

  @IsInt({message: 'Price must be an integer'})
  @Min(MIN_ROOMS, {message: `Minimum bedrooms is ${MIN_ROOMS}`})
  @Max(MAX_ROOMS, {message: `Minimum bedrooms is ${MIN_ROOMS}`})
  public bedrooms!: number;

  public commentsCount!: number;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public createdDate!: Date;
}
