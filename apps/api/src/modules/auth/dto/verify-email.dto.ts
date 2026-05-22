import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({
    required: true,
    type: String,
    example: '9bf82bdk3fd',
    description: "Token needed to verify the user's email",
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
