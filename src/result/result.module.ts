import { HttpModule, Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultControllerV1 } from './v1/result.controller.v1';

@Module({
  imports: [HttpModule],
  providers: [ResultService],
  controllers: [ResultControllerV1],
})
export class ResultModule {}
