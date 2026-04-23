import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { TokenType } from '../../../generated/prisma/enums';
import { Transform } from 'class-transformer';

export class GenerateTokenDto {
  @IsEnum({ TokenType })
  @IsNotEmpty()
  type: TokenType;

  @IsDate()
  @Transform(() => Date)
  @IsOptional()
  expiresAt?: Date;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
