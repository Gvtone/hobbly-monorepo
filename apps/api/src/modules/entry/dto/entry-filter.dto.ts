import { ApiPropertyOptional } from '@nestjs/swagger';
import { Visibility } from '../../../generated/prisma/enums';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import {
  EntryFilterDto as IEntryFilterDto,
  PublicEntryFilterDto as IPublicEntryFilterDto,
} from '@hobbies-dashboard/types';

export class EntryFilterDto implements IEntryFilterDto {
  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    type: [Number],
    description: 'Comma-separated IDs, e.g. 1,2',
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) => {
    return Array.isArray(value)
      ? value.map(Number)
      : value.split(',').map(Number);
  })
  hobbyId?: number[];

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) => {
    return Array.isArray(value)
      ? value.map(Number)
      : value.split(',').map(Number);
  })
  moodId?: number[];

  @ApiPropertyOptional({ enum: Visibility })
  @IsEnum(Visibility)
  @IsOptional()
  visibility?: Visibility;

  @ApiPropertyOptional({ enum: Visibility })
  @IsEnum(Visibility)
  @IsOptional()
  userVisibility?: Visibility;

  @ApiPropertyOptional({
    type: Date,
    example: '2026-04-27',
  })
  @IsDate()
  @Transform(({ value }: { value: string | number | Date }) => new Date(value))
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional({
    type: Date,
    example: '2026-04-27',
  })
  @IsDate()
  @Transform(({ value }: { value: string | number | Date }) => new Date(value))
  @IsOptional()
  endDate?: Date;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  limit?: number;
}

export class PublicEntryFilterDto implements IPublicEntryFilterDto {
  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    type: [Number],
    description: 'Comma-separated IDs, e.g. 1,2',
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) => {
    return Array.isArray(value)
      ? value.map(Number)
      : value.split(',').map(Number);
  })
  hobbyId?: number[];

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) => {
    return Array.isArray(value)
      ? value.map(Number)
      : value.split(',').map(Number);
  })
  moodId?: number[];

  @ApiPropertyOptional({
    type: Date,
    example: '2026-04-27',
  })
  @IsDate()
  @Transform(({ value }: { value: string | number | Date }) => new Date(value))
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional({
    type: Date,
    example: '2026-04-27',
  })
  @IsDate()
  @Transform(({ value }: { value: string | number | Date }) => new Date(value))
  @IsOptional()
  endDate?: Date;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  limit?: number;
}
