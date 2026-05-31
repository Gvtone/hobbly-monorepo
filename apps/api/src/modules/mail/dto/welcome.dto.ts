import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class WelcomeDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}

export class GoodbyeDto extends WelcomeDto {}
