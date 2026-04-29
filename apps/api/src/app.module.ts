import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './common/database/database.module';
import { UserModule } from './modules/user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './modules/mail/mail.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
import { join } from 'path';
import { TokenModule } from './modules/token/token.module';
import { JwtAuthGuard } from './modules/auth/guard/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/auth/guard/roles.guard';
import { HobbyModule } from './modules/hobby/hobby.module';
import { UserHobbyModule } from './modules/user-hobby/user-hobby.module';
import { EntryModule } from './modules/entry/entry.module';
import { EntryMoodModule } from './modules/entry-mood/entry-mood.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        port: +process.env.MAILER_PORT,
        secure: false,
        auth: {
          user: process.env.MAILER_USERNAME,
          pass: process.env.MAILER_PASSWORD,
        },
      },
      defaults: {
        from: `"${process.env.MAILER_FROM_NAME}" <${process.env.MAILER_FROM_EMAIL}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(
          {
            year: () => new Date().getFullYear(),
          },
          {
            inlineCssEnabled: true,
          },
        ),
        options: {
          strict: true,
        },
      },
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    MailModule,
    TokenModule,
    HobbyModule,
    UserHobbyModule,
    EntryModule,
    EntryMoodModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
