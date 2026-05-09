import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';
import { HashService } from '../../common/utils/hash.service';

@Injectable()
export class ProfileShareService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly hashService: HashService,
  ) {}

  async createOrRemake(userId: number) {
    const referenceId = this.hashService.generateToken(16);

    const existing = await this.databaseService.profileShare.findFirst({
      where: { userId },
    });

    if (existing) {
      return await this.databaseService.profileShare.update({
        where: { userId: existing.userId },
        data: { referenceId },
      });
    }

    return await this.databaseService.profileShare.create({
      data: {
        userId,
        referenceId,
      },
    });
  }

  async findOwnRef(userId: number) {
    return await this.databaseService.profileShare.findUnique({
      where: { userId },
    });
  }

  async findByReference(referenceId: string) {
    const share = await this.databaseService.profileShare.findFirst({
      where: { referenceId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            profilePicture: true,
            coverImage: true,
            bio: true,
            visibility: true,
          },
        },
      },
    });

    if (!share) throw new NotFoundException('Share link not found or expired');

    return share.user;
  }

  async revoke(userId: number) {
    return await this.databaseService.profileShare.delete({
      where: { userId },
    });
  }
}
