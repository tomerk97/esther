import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Answer extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Number, required: true })
  severity: number;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);

@Schema()
export class Question extends Document {
  @Prop({ type: String, required: true, unique: true, default: uuid })
  title: string;

  @Prop({ type: [AnswerSchema], required: true })
  answers: Answer[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
