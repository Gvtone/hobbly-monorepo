import type { GenericOutputEntity as IGenericOutputEntity } from '@hobbies-dashboard/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GenericOutputEntity implements IGenericOutputEntity {
  @ApiPropertyOptional({ type: String, nullable: true })
  status?: GenericOutputStatus | null;

  @ApiProperty({ type: String })
  message: string;
}

export enum GenericOutputStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}
