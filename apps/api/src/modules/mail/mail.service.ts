import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ForgotPasswordEmailDto } from './dto/forgot-password-email.dto';
import { WelcomeDto } from './dto/welcome.dto';
import { ConfigService } from '@nestjs/config';
import { PasswordChangeEmailDto } from './dto/password-changed-email.dto';
import { SendVerifyEmailDto } from './dto/send-verify-email.dto';
import {
  GenericOutputEntity,
  GenericOutputStatus,
} from '../../common/entities/generic-output.entity';

@Injectable()
export class MailService {
  private readonly clientUrl: string;

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    this.clientUrl = this.configService.getOrThrow<string>('CLIENT_URL');
  }

  async sendWelcomeEmail({
    email,
    ...welcomeDto
  }: WelcomeDto): Promise<GenericOutputEntity> {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to Hobbly ✨',
        template: 'welcome',
        context: { welcomeDto },
      });

      return {
        status: GenericOutputStatus.SUCCESS,
        message: 'Sent Welcome email successfully',
      };
    } catch (error) {
      return {
        status: GenericOutputStatus.FAILED,
        message: String(error),
      };
    }
  }

  async sendVerificationEmail({
    to,
    username,
    token,
  }: SendVerifyEmailDto): Promise<GenericOutputEntity> {
    const verificationUrl = `${this.clientUrl}/verify-email?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Reset your Hobbly Password',
        template: 'forgot-password',
        context: { username, verificationUrl },
      });

      return {
        status: GenericOutputStatus.SUCCESS,
        message: 'Sent Forgot Password email successfully',
      };
    } catch (error) {
      return {
        status: GenericOutputStatus.FAILED,
        message: String(error),
      };
    }
  }

  async sendForgotPasswordEmail({
    to,
    username,
    token,
  }: ForgotPasswordEmailDto): Promise<GenericOutputEntity> {
    const resetUrl = `${this.clientUrl}/reset-password?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Reset your Hobbly Password',
        template: 'forgot-password',
        context: { username, resetUrl },
      });

      return {
        status: GenericOutputStatus.SUCCESS,
        message: 'Sent Forgot Password email successfully',
      };
    } catch (error) {
      return {
        status: GenericOutputStatus.FAILED,
        message: String(error),
      };
    }
  }

  async sendPasswordChangedEmail({
    to,
    username,
  }: PasswordChangeEmailDto): Promise<GenericOutputEntity> {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Your Hobbly password was changed',
        template: 'password-changed',
        context: { email: to, username, changedAt: new Date() },
      });

      return {
        status: GenericOutputStatus.SUCCESS,
        message: 'Sent Password Changed email successfully',
      };
    } catch (error) {
      return {
        status: GenericOutputStatus.FAILED,
        message: String(error),
      };
    }
  }
}
