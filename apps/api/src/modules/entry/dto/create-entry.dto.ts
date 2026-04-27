import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Visibility } from '../../../generated/prisma/enums';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import type {
  CreateEntryDto as ICreateEntryDto,
  JsonValue,
} from '@hobbies-dashboard/types';
import { Transform } from 'class-transformer';

export class CreateEntryDto implements ICreateEntryDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  userHobbyId: number;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  moodId?: number;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  note?: string;

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
  activityDate?: Date;

  @ApiPropertyOptional({ enum: Visibility })
  @IsEnum(Visibility)
  @IsOptional()
  visibility?: Visibility;

  @ApiPropertyOptional({ type: Object })
  @IsObject()
  @IsOptional()
  metadata?: JsonValue;
}
