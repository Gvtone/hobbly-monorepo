import {
  Injectable,
  NestMiddleware,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MaintenanceMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (this.configService.get('MAINTENANCE_MODE') === 'true') {
      throw new ServiceUnavailableException(
        'Hobbly is currently under maintenance. Please check back soon.',
      );
    }
    next();
  }
}
