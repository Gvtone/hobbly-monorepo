import { ApiPropertyOptional } from '@nestjs/swagger';
import { HobbyCategory, HobbyStatus } from '../../../generated/prisma/enums';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { HobbyFilterDto as IHobbyFilterDto } from '@hobbies-dashboard/types';

export class HobbyFilterDto implements IHobbyFilterDto {
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
  id?: number[];

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ enum: HobbyCategory })
  @IsEnum(HobbyCategory)
  @IsOptional()
  category?: HobbyCategory;

  @ApiPropertyOptional({ enum: HobbyStatus })
  @IsEnum(HobbyStatus)
  @IsOptional()
  status?: HobbyStatus;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  limit?: number;
}
