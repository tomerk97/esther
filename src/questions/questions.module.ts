import { Module } from '@nestjs/common';
import { QuestionsControllerV1 } from './v1/questions.controller.v1';
import { QuestionsService } from './questions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './entities/question.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Question.name,
        schema: QuestionSchema,
      },
    ]),
  ],
  controllers: [QuestionsControllerV1],
  providers: [QuestionsService],
})
export class QuestionsModule {}
