import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'starweaver@hobbly.io',
    description: 'Email address',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
