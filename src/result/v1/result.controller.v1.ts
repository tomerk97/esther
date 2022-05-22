import { Body, Controller, Post } from '@nestjs/common';
import { PredictRequest } from '../dto/predict-request.dto';
import { PredictResponse } from '../dto/predict-response.dto';
import { ResultService } from '../result.service';

@Controller('resources/result/v1')
export class ResultControllerV1 {
  constructor(private readonly resultService: ResultService) {}
  @Post('/')
  public async getAllQuestions(
    @Body() model: PredictRequest,
  ): Promise<PredictResponse> {
    return this.resultService.getPrediction(model);
  }
}
