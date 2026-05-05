import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CommentFilterDto {
  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  limit?: number;
}
