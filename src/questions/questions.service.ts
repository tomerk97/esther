import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private readonly tenantsModel: Model<Question>,
  ) {}

  public async getAllQuestions(): Promise<Question[]> {
    return this.tenantsModel.find({}, { _id: 0 });
  }
}
