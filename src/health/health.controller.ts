import { Controller, Get, Response } from '@nestjs/common';
import { Response as ExpressResponse} from 'express';

@Controller()
export class HealthController {
  constructor() {}

  @Get('/health')
  healthCheck(@Response() response: ExpressResponse): void {
    response.status(200).send('healthy');
  }
}
