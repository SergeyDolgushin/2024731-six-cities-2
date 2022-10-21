import { IsEmail, IsString, Length } from 'class-validator';
import { MAX_PASSWORD, MIN_PASSWORD } from '../user-constants.js';

export default class LoginUserDto {
  @IsString({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid email address' })
  public email!: string;

  @IsString({ message: 'Password is required' })
  @Length(MIN_PASSWORD, MAX_PASSWORD, {
    message: `Password user name length is ${MIN_PASSWORD}, maximum is ${MAX_PASSWORD}`,
  })
  public password!: string;
}
