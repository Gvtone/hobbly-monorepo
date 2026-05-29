import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isProduction = process.env.NODE_ENV === 'production';

    let status: number;
    let message: string | object;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // Keep validation error messages (from ValidationPipe) — they're safe
      message =
        typeof exceptionResponse === 'object'
          ? exceptionResponse
          : { message: exceptionResponse };
    } else {
      // Unknown error — could be a database error, runtime error, etc.
      status = HttpStatus.INTERNAL_SERVER_ERROR;

      // In production, never reveal the real error
      message = isProduction
        ? { message: 'Something went wrong. Please try again later.' }
        : { message: (exception as Error)?.message ?? 'Internal server error' };

      // Always log the real error on the server side
      this.logger.error(
        `Unhandled exception on ${request.method} ${request.url}`,
        (exception as Error)?.stack,
      );
    }

    response.status(status).json({
      statusCode: status,
      ...(typeof message === 'object' ? message : { message }),
      timestamp: new Date().toISOString(),
      ...(!isProduction && { path: request.url }),
    });
  }
}
