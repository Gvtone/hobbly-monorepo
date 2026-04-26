import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class AuthPayloadDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'starweaver or starweaver@hobbly.io',
    description: 'Email address or username',
  })
  @IsNotEmpty()
  @IsString()
  identifier: string;

  @ApiProperty({
    required: true,
    type: String,
    minLength: 8,
    example: 'ILoveHobbly!',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long.',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message: 'Password must contain at least one special character',
  })
  password: string;
}
