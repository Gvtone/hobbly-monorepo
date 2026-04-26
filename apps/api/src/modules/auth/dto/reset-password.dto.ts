import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    required: true,
    type: String,
    example: '987nrbcvhf82',
    description: 'Token from email to reset password',
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'MyNewPassword!',
    description: 'The new password the user wishes to use',
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
