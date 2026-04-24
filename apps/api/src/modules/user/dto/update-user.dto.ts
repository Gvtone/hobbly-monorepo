import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { UserStatus } from '../../../generated/prisma/enums';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEnum({ UserStatus })
  @IsOptional()
  status?: UserStatus;
}
