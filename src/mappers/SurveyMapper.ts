import { AnswerVariant, Question, Survey } from '@prisma/client';

export class SurveyMapper {
  getSurveyWithQuestions(
    survey: Survey & {
      questions: (Question & { answer_variants: AnswerVariant[] })[];
    },
  ) {
    return {
      title: survey.title,
      description: survey.description,
      questions: this.getQuestions(survey.questions),
    };
  }

  getQuestions(questions: (Question & { answer_variants: AnswerVariant[] })[]) {
    return questions.map((question) => ({
      text: question.text,
      variants: question.answer_variants,
    }));
  }
}
