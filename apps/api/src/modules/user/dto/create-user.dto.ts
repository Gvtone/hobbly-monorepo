import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'starweaver',
    description: "User's picked username",
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  @IsLowercase()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'starweaver@hobbly.io',
    description: 'Email address',
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    minLength: 8,
    example: 'ILoveHobbly!',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ minLength: 8 })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message: 'Password must contain at least one special character',
  })
  password: string;
}
