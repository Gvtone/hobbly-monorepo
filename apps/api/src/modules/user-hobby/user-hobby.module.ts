import { Module } from '@nestjs/common';
import { UserHobbyService } from './user-hobby.service';
import { UserHobbyController } from './user-hobby.controller';

@Module({
  controllers: [UserHobbyController],
  providers: [UserHobbyService],
})
export class UserHobbyModule {}
