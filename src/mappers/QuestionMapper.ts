import { DbQuestion } from '../DbEntities/DbQuestion';
import { Answer, AnswerVariant } from '@prisma/client';

export class QuestionMapper {
  getQuestionWithAnswers(question: DbQuestion) {
    return {
      id: question.id,
      text: question.text,
      answer_variants: this.getAnswerVariants(question.answer_variants),
    };
  }

  getAnswerVariants(
    answerVariants: (AnswerVariant & {
      answers: Answer[];
    })[],
  ) {
    return answerVariants.map((answerVariant) => ({
      id: answerVariant.id,
      text: answerVariant.text,
      answers: this.getAnswers(answerVariant.answers),
    }));
  }

  getAnswers(answers: Answer[]) {
    return answers.map((answer) => ({
      id: answer.id,
    }));
  }
}
