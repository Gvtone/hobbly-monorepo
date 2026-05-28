import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGoogleUserDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  googleId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  avatar: string;
}
