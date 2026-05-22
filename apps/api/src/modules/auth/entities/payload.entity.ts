import { ApiProperty } from '@nestjs/swagger';
import {
  UserRole,
  UserStatus,
  Visibility,
} from '../../../generated/prisma/enums';
import type { JwtPayload } from '@hobbies-dashboard/types';

export class PayloadEntity implements JwtPayload {
  @ApiProperty({ type: Number })
  sub: number;

  @ApiProperty({ type: String })
  displayName?: string | null;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty({ enum: Visibility })
  visibility: Visibility;

  @ApiProperty({ enum: UserStatus })
  status: UserStatus;

  @ApiProperty({ enum: { ACCESS: 'ACCESS', REFRESH: 'REFRESH' } })
  type: 'ACCESS' | 'REFRESH' = 'ACCESS';
}
