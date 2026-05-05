import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/common';
import type { PaginatedOutputEntity as IPaginatedOutputEntity } from '@hobbies-dashboard/types';

export class PaginatedMetaEntity implements IPaginatedOutputEntity {
  @ApiProperty() currentPage: number;
  @ApiProperty() isFirstPage: boolean;
  @ApiProperty() isLastPage: boolean;
  @ApiProperty({ nullable: true }) previousPage: number | null;
  @ApiProperty({ nullable: true }) nextPage: number | null;
  @ApiProperty() pageCount: number;
  @ApiProperty() totalCount: number;
}

export function PaginatedEntity<T>(ItemClass: Type<T>) {
  class Paginated extends PaginatedMetaEntity {
    @ApiProperty({ type: () => [ItemClass] })
    data: T[];
  }
  Object.defineProperty(Paginated, 'name', { value: `Paginated${ItemClass.name}` });
  return Paginated;
}
