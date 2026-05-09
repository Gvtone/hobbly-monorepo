import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { SetCurrentMoodDto as ISetCurrentMoodDto } from '@hobbies-dashboard/types';

export class SetCurrentMoodDto implements ISetCurrentMoodDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  description?: string;
}
