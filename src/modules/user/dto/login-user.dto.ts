import { IsEmail, IsString } from 'class-validator';

export default class LoginUserDto {
  @IsString({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid email address' })
  public email!: string;

  @IsString({ message: 'Password is required' })
  public password!: string;
}
