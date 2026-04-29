import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { UserStatus } from '../../../generated/prisma/enums';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ enum: UserStatus })
  @IsEnum({ UserStatus })
  @IsOptional()
  status?: UserStatus;
}
