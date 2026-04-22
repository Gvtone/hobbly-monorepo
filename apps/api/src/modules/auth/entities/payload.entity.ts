import { ApiProperty } from '@nestjs/swagger';
import { UserRole, Visibility } from '../../../generated/prisma/enums';

export class PayloadEntity {
  @ApiProperty({ type: Number })
  sub: number;

  @ApiProperty({ type: Number })
  displayName?: string | null;

  @ApiProperty({ type: Number })
  username: string;

  @ApiProperty({ type: Number })
  email: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty({ enum: Visibility })
  visibility: Visibility;
}
