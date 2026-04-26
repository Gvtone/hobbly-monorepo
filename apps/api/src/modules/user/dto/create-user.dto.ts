import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsLowercase,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.toLowerCase())
  @IsLowercase()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

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
