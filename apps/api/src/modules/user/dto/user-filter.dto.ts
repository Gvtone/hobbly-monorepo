import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  UserRole,
  UserStatus,
  Visibility,
} from '../../../generated/prisma/enums';
import { UserFilterDto as IUserFilterDto } from '@hobbies-dashboard/types';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UserFilterDto implements IUserFilterDto {
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

  @ApiPropertyOptional({ enum: UserRole })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiPropertyOptional({ enum: Visibility })
  @IsEnum(Visibility)
  @IsOptional()
  visibility?: Visibility;

  @ApiPropertyOptional({ enum: UserStatus })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  limit?: number;
}
