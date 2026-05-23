import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { ForgotPasswordEmailDto } from './dto/forgot-password-email.dto';
import { WelcomeDto } from './dto/welcome.dto';
import { PasswordChangeEmailDto } from './dto/password-changed-email.dto';
import { SendVerifyEmailDto } from './dto/send-verify-email.dto';
import {
  GenericOutputEntity,
  GenericOutputStatus,
} from '../../common/entities/generic-output.entity';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly resend: Resend;
  private readonly from: string;
  private readonly clientUrl: string;
  private readonly templates = new Map<string, handlebars.TemplateDelegate>();

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(
      this.configService.getOrThrow<string>('RESEND_API_KEY'),
    );
    this.from = `"${this.configService.getOrThrow<string>('MAILER_FROM_NAME')}" <${this.configService.getOrThrow<string>('MAILER_FROM_EMAIL')}>`;
    this.clientUrl = this.configService.getOrThrow<string>('CLIENT_URL');

    const templateDir = path.join(__dirname, '..', '..', 'templates');
    for (const name of [
      'welcome',
      'verify-email',
      'forgot-password',
      'password-changed',
    ]) {
      const src = fs.readFileSync(
        path.join(templateDir, `${name}.hbs`),
        'utf8',
      );
      this.templates.set(name, handlebars.compile(src));
    }
  }

  private render(name: string, context: Record<string, unknown>): string {
    const tpl = this.templates.get(name);
    if (!tpl) throw new Error(`Template "${name}" not found`);
    return tpl({ ...context, year: new Date().getFullYear() });
  }

  private async send(
    to: string,
    subject: string,
    template: string,
    context: Record<string, unknown>,
  ): Promise<GenericOutputEntity> {
    try {
      const html = this.render(template, context);
      const { error } = await this.resend.emails.send({
        from: this.from,
        to,
        subject,
        html,
      });

      if (error) {
        this.logger.error(
          `Resend error (${template}): ${JSON.stringify(error)}`,
        );
        return { status: GenericOutputStatus.FAILED, message: error.message };
      }

      return {
        status: GenericOutputStatus.SUCCESS,
        message: 'Email sent successfully',
      };
    } catch (err) {
      this.logger.error(`Mail send failed (${template}): ${String(err)}`);
      return { status: GenericOutputStatus.FAILED, message: String(err) };
    }
  }

  async sendWelcomeEmail({
    email,
    username,
  }: WelcomeDto): Promise<GenericOutputEntity> {
    return this.send(email, 'Welcome to Hobbly ✨', 'welcome', {
      username,
      dashboardUrl: `${this.clientUrl}/dashboard`,
    });
  }

  async sendVerificationEmail({
    to,
    username,
    token,
  }: SendVerifyEmailDto): Promise<GenericOutputEntity> {
    return this.send(to, 'Verify your Hobbly Account', 'verify-email', {
      username,
      verificationUrl: `${this.clientUrl}/verify-email?token=${token}`,
    });
  }

  async sendForgotPasswordEmail({
    to,
    username,
    token,
  }: ForgotPasswordEmailDto): Promise<GenericOutputEntity> {
    return this.send(to, 'Reset your Hobbly Password', 'forgot-password', {
      username,
      resetUrl: `${this.clientUrl}/reset-password?token=${token}`,
    });
  }

  async sendPasswordChangedEmail({
    to,
    username,
  }: PasswordChangeEmailDto): Promise<GenericOutputEntity> {
    return this.send(
      to,
      'Your Hobbly password was changed',
      'password-changed',
      {
        username,
        email: to,
        changedAt: new Date().toLocaleString(),
      },
    );
  }
}
