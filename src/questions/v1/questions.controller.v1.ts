import { Controller, Get } from '@nestjs/common';
import { QuestionsService } from '../questions.service';
import { Question } from '../entities/question.entity';

@Controller('resources/questions/v1')
export class QuestionsControllerV1 {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('/')
  public async getAllQuestions(): Promise<Question[]> {
    return this.questionsService.getAllQuestions();
  }
}
