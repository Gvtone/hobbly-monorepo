import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashService } from '../../common/utils/hash.service';

@Module({
  controllers: [UserController],
  providers: [UserService, HashService],
  exports: [UserService],
})
export class UserModule {}
