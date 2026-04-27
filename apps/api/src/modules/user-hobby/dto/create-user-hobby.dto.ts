import { CreateUserHobbyDto as IUserHobbyDto } from '@hobbies-dashboard/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserHobbyDto implements IUserHobbyDto {
  @ApiProperty({
    type: Number,
    description: 'The hobby that is connected to the user',
  })
  @IsNumber()
  @IsNotEmpty()
  hobbyId: number;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  backgroundImage?: string;
}
