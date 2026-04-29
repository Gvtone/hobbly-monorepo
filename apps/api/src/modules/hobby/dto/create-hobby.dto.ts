import { CreateHobbyDto as ICreateHobbyDto } from '@hobbies-dashboard/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHobbyDto implements ICreateHobbyDto {
  @ApiProperty({ type: String, example: 'Art' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, example: '#7ec8e3' })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({ type: String, example: 'url or emoji ✨' })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  description?: string;
}
