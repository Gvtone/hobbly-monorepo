import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { TokenType } from '../../../generated/prisma/enums';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GenerateTokenDto {
  @ApiProperty({ enum: TokenType, example: 'PASSWORD_RESET' })
  @IsEnum({ TokenType })
  @IsNotEmpty()
  type: TokenType;

  @ApiPropertyOptional({
    type: Date,
    examples: [
      '2026-04-27',
      '2026-04-27T16:00:00Z',
      '2026-04-27T16:00:00.000Z',
    ],
  })
  @IsDate()
  @Transform(({ value }: { value: string | number | Date }) => new Date(value))
  @IsOptional()
  expiresAt?: Date;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
