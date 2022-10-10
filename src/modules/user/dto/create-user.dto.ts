import { IsBoolean, IsEmail, IsString, Length, Matches } from 'class-validator';
import { MAX_PASSWORD, MAX_USERNAME, MIN_PASSWORD, MIN_USERNAME } from '../user-constants.js';

export default class CreateUserDto {
  @IsString({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid email address' })
  public email!: string ;

  @Matches(/[\w/-]+.(jpg|png)/, { message: 'Avatar must be jpg or png' })
  public avatarUrl!: string;

  @IsString({ message: 'User name is required' })
  @Length(MIN_USERNAME, MAX_USERNAME, {
    message: `Minimum user name length is ${MIN_USERNAME}, maximum is ${MAX_USERNAME}`,
  })
  public name!: string;

  @IsBoolean()
  public isPro!: boolean;

  @IsString({ message: 'Password is required' })
  @Length(MIN_PASSWORD, MAX_PASSWORD, {
    message: `Password user name length is ${MIN_PASSWORD}, maximum is ${MAX_PASSWORD}`,
  })
  public password!: string;
}
