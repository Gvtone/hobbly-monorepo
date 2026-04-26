import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmailDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  token: string;
}
