import { Matches, IsOptional, IsArray, IsMongoId } from 'class-validator';

export default class UpdateUserDto {

  @Matches(/[\w/-]+.(jpg|png)/, { message: 'Avatar must be jpg or png' })
  public avatarUrl?: string;

  @IsOptional()
  @IsArray({message: 'Should be array'})
  @IsMongoId({each: true, message: 'field must be valid an id'})
  public favorites?: string[];
}
