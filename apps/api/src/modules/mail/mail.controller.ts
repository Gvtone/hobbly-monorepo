import { Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('test')
  async test() {
    await this.mailService.sendWelcomeEmail({
      email: 'delivered@resend.dev',
      username: 'user',
    });
  }
}
