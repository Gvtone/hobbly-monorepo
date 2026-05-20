import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { DatabaseService } from '../../common/database/database.service';
import { EntryFilterDto } from './dto/entry-filter.dto';
import { Prisma } from '../../generated/prisma/client';
import { EntryMoodService } from '../entry-mood/entry-mood.service';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';

@Injectable()
export class EntryService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly entryMoodService: EntryMoodService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(createEntryDto: CreateEntryDto, image?: Express.Multer.File) {
    if (createEntryDto.moodId) {
      const entryMood = await this.entryMoodService.findOne(
        createEntryDto.moodId,
      );

      if (!entryMood) {
        throw new NotFoundException('Mood does not exist');
      }
    }

    return await this.databaseService.$transaction(async (tx) => {
      const createdEntry = await tx.entry.create({
        data: { ...createEntryDto },
      });

      if (image) {
        const { secure_url } = await this.cloudinary.upload(
          image,
          `entryImage/${createdEntry.id}`,
        );

        return await tx.entry.update({
          where: { id: createdEntry.id },
          data: { image: secure_url },
        });
      }

      return createdEntry;
    });
  }

  async findAll({
    userId,
    search,
    hobbyId,
    moodId,
    visibility,
    userVisibility,
    startDate,
    endDate,
    page,
    limit = 10,
  }: EntryFilterDto) {
    const userHobbyCondition: Prisma.UserHobbyWhereInput = {
      ...(userId && { userId }),
      ...(hobbyId && { hobbyId: { in: hobbyId } }),
      ...(userVisibility && { user: { visibility: userVisibility } }),
    };

    const whereClause: Prisma.EntryWhereInput = {
      ...(Object.keys(userHobbyCondition).length > 0 && {
        userHobby: userHobbyCondition,
      }),

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

      ...(moodId && { moodId: { in: moodId } }),
      ...(visibility && { visibility }),
      ...(startDate || endDate
        ? { activityDate: { gte: startDate, lte: endDate } }
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
                  id: true,
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

  async findById(id: number) {
    return await this.databaseService.entry.findFirst({ where: { id } });
  }

  async update(id: number, userId: number, updateEntryDto: UpdateEntryDto) {
    return await this.databaseService.entry.update({
      where: { id, userHobby: { userId } },
      data: updateEntryDto,
    });
  }

  async delete(id: number, userId: number) {
    const { image } = await this.findById(id);

    if (image) await this.cloudinary.delete(image);

    return await this.databaseService.entry.delete({
      where: { id, userHobby: { userId } },
    });
  }
}
