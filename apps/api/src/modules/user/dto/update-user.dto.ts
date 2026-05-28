import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { UserStatus, Visibility } from '../../../generated/prisma/enums';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  googleId?: string;

  @ApiPropertyOptional({ enum: UserStatus })
  @IsEnum({ UserStatus })
  @IsOptional()
  status?: UserStatus;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  profilePicture?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  coverImage?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  displayName?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional({ enum: Visibility })
  @IsEnum(Visibility)
  @IsOptional()
  visibility?: Visibility;
}
