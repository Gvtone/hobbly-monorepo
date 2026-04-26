import { ApiProperty } from '@nestjs/swagger';
import { UserRole, Visibility } from '../../../generated/prisma/enums';
import type { JwtPayload } from '@hobbies-dashboard/types';

export class PayloadEntity implements JwtPayload {
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

  @ApiProperty({ enum: { ACCESS: 'ACCESS', REFRESH: 'REFRESH' } })
  type: 'ACCESS' | 'REFRESH' = 'ACCESS';
}
