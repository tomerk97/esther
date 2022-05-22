import { ValidateNested } from "class-validator";

export class PredictRequest {
  @ValidateNested()
  result: Record<number, number>;
}
