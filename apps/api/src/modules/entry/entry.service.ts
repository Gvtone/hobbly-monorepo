import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { DatabaseService } from '../../common/database/database.service';
import { EntryFilterDto } from './dto/entry-filter.dto';
import { Prisma } from '../../generated/prisma/client';

@Injectable()
export class EntryService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEntryDto: CreateEntryDto) {
    const mood = await this.databaseService.entryMood.findUnique({
      where: { id: createEntryDto.moodId },
    });

    if (!mood) {
      throw new NotFoundException('Mood does not exist');
    }

    return await this.databaseService.entry.create({ data: createEntryDto });
  }

  async findAll(
    userId: number,
    {
      search,
      hobbyId,
      moodId,
      visibility,
      startDate,
      endDate,
      page,
      limit = 10,
    }: EntryFilterDto,
  ) {
    const whereClause: Prisma.EntryWhereInput = {
      userHobby: { userId },

      // Search across multiple fields
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { note: { contains: search, mode: 'insensitive' } },
          {
            userHobby: {
              user: { displayName: { contains: search, mode: 'insensitive' } },
            },
          },
          {
            userHobby: {
              user: { username: { contains: search, mode: 'insensitive' } },
            },
          },
        ],
      }),

      // Filter by hobbies
      ...(hobbyId && { userHobby: { hobbyId: { in: hobbyId } } }),

      // Filter by moods
      ...(moodId && { moodId: { in: moodId } }),

      // Filter by visibility
      ...(visibility && { visibility }),

      // Filter by date range
      ...(startDate || endDate
        ? {
            activityDate: {
              gte: startDate,
              lte: endDate,
            },
          }
        : {}),
    };

    const paginatedDatabase = await this.databaseService.paginateModel();

    return paginatedDatabase.entry
      .paginate({
        where: whereClause,
        include: {
          userHobby: {
            include: {
              hobby: true,
              user: {
                select: {
                  displayName: true,
                  username: true,
                  profilePicture: true,
                  coverImage: true,
                  bio: true,
                  visibility: true,
                },
              },
            },
          },
          mood: true,
        },
        orderBy: { activityDate: 'desc' },
      })
      .withPages({ page, limit });
  }

  async update(id: number, userId: number, updateEntryDto: UpdateEntryDto) {
    return await this.databaseService.entry.update({
      where: { id, userHobby: { userId } },
      data: updateEntryDto,
    });
  }

  async delete(id: number, userId: number) {
    return await this.databaseService.entry.delete({
      where: { id, userHobby: { userId } },
    });
  }
}
