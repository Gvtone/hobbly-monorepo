import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';

@Injectable()
export class HobbyService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createHobbyDto: CreateHobbyDto) {
    return await this.databaseService.hobby.create({ data: createHobbyDto });
  }

  async findAll() {
    // TODO: Add pagination
    // TODO: Add search query
    return await this.databaseService.hobby.findMany();
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
