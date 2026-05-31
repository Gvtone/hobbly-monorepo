import { Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Roles('ADMIN')
  @Post('test')
  async test() {
    await this.mailService.sendWelcomeEmail({
      email: 'delivered@resend.dev',
      username: 'user',
    });
  }
}
