import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole, Visibility } from '../../../generated/prisma/enums';

export class ValidateUser {
  @IsNumber()
  @IsNotEmpty()
  sub: number;

  @IsString()
  @IsOptional()
  displayName?: string | null;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @IsEnum(Visibility)
  @IsNotEmpty()
  visibility: Visibility;
}
