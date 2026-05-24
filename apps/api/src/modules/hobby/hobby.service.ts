import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { HobbyFilterDto } from './dto/hobby-filter.dto';
import { Prisma } from '../../generated/prisma/client';

@Injectable()
export class HobbyService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createHobbyDto: CreateHobbyDto) {
    return await this.databaseService.hobby.create({ data: createHobbyDto });
  }

  async findAll({
    id,
    search,
    category,
    status,
    page,
    limit = 10,
  }: HobbyFilterDto) {
    const whereClause: Prisma.HobbyWhereInput = {
      ...(id && { id: { in: id } }),
      ...(category && { category }),
      ...(status && { status }),

      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { color: { contains: search, mode: 'insensitive' } },
          { icon: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const paginatedDatabase = await this.databaseService.paginateModel();

    return await paginatedDatabase.hobby
      .paginate({
        where: whereClause,
        orderBy: { name: 'desc' },
      })
      .withPages({ page, limit });
  }

  async findById(id: number) {
    return await this.databaseService.hobby.findFirst({ where: { id } });
  }

  async update(id: number, updateHobbyDto: UpdateHobbyDto) {
    return await this.databaseService.hobby.update({
      where: { id },
      data: updateHobbyDto,
    });
  }

  async delete(id: number) {
    return await this.databaseService.hobby.delete({ where: { id } });
  }
}
