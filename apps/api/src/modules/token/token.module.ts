import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { HashService } from '../../common/utils/hash.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [TokenController],
  providers: [TokenService, HashService],
  exports: [TokenService],
})
export class TokenModule {}
