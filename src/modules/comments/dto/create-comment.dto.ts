import { IsMongoId, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { MAX_RATING, MAX_TEXT, MIN_RATING, MIN_TEXT } from '../comment-constants.js';

export default class CreateCommentDto {
  @IsString({ message: 'Comment text is required' })
  @Length(
    MIN_TEXT, MAX_TEXT,
    { message: `Minimum comment text length is ${MIN_TEXT}, maximum is ${MAX_TEXT}` })
  public text!: string;

  @IsNumber({}, { message: 'Rating is required' })
  @Min(MIN_RATING, { message: `Minimum rating must be ${MIN_RATING}` })
  @Max(MAX_RATING, { message: `Maximum rating must be ${MAX_RATING}` })
  public rating!: number;

  @IsMongoId({ message: 'OfferID must be valid ID' })
  public offerId!: string;

  public hostId!: string;
}
