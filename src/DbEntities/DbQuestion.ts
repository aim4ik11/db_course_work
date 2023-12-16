import { Answer, AnswerVariant, Survey } from '@prisma/client';

export class DbQuestion {
  id: number;
  text: string;
  survey_id: number;
  survey: Survey;
  answer_variants: (AnswerVariant & {
    answers: Answer[];
  })[];
}
