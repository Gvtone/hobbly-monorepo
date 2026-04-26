import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TokenType } from '../../../generated/prisma/enums';

export class VerifyTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsEnum({ TokenType })
  @IsNotEmpty()
  type: TokenType;
}
