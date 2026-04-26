import type { GenericOutputEntity as IGenericOutputEntity } from '@hobbies-dashboard/types';
import { ApiProperty } from '@nestjs/swagger';

export class GenericOutputEntity implements IGenericOutputEntity {
  @ApiProperty({ type: String })
  status?: GenericOutputStatus | null;

  @ApiProperty({ type: String })
  message: string;
}

export enum GenericOutputStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}
