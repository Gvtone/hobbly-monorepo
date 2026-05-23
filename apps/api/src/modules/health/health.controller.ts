import { Controller, Get } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Public()
  @Get()
  @ApiOperation({ summary: 'Get Server status' })
  @ApiOkResponse({
    description: 'Got status',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string' },
      },
    },
  })
  check() {
    return { status: 'ok' };
  }
}
