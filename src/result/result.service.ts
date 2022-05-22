import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { IConfigSchema } from '../config';
import { PredictRequest } from './dto/predict-request.dto';
import { PredictResponse } from './dto/predict-response.dto';
import { resultMapping } from './resultMapping';

@Injectable()
export class ResultService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<IConfigSchema>,
  ) {}
  public async getPrediction(model: PredictRequest): Promise<PredictResponse> {
    return this.sendResult(model);
  }

  private async sendResult(model: PredictRequest): Promise<PredictResponse> {
    const { url } = this.configService.get('resultService', { infer: true });
    const mappedModel = this.createResultModel(model);
    const { data } = await firstValueFrom(
      this.httpService.post(`${url}/predict`, mappedModel),
    );
    return {
      prediction: Number(
        (Object.values(data)[0] as string).replace(/\[|\]/g, ''),
      ),
    };
  }

  private createResultModel({ result }: PredictRequest) {
    return Object.keys(result).reduce(
      (acc, key) => ({
        ...acc,
        [resultMapping[key]]: result[key],
      }),
      {},
    );
  }
}
