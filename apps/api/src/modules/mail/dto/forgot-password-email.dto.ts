import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordEmailDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
