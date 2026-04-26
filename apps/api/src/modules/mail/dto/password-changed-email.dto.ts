import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PasswordChangeEmailDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
