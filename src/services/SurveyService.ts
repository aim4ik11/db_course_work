import { Injectable } from '@nestjs/common';
import { CreateSurveyDTO } from '../dtos/CreateSurveyDTO';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { AnswerVariant, Question, Survey, SurveyState } from '@prisma/client';
import { AddQuestionDTO } from '../dtos/AddQuestionDTO';
import { QuestionRepository } from '../repositories/QuestionRepository';
import { TakeSurveyDTO } from '../dtos/TakeSurveyDTO';
import { WrongAnswersFormatException } from '../exceptions/WrongAnswersFormatException';
import { SurveyAlreadyTakenException } from '../exceptions/SurveyAlreadyTakenException';
import { PassedSurveyRepository } from '../repositories/PassedSurveyRepository';
import { SurveyIsClosedException } from '../exceptions/SurveyIsClosedException';
import { SurveyNotTakenException } from '../exceptions/SurveyNotTakenException';
import { NotBelongException } from '../exceptions/NotBelongException';
import { DbQuestion } from '../DbEntities/DbQuestion';
import { UpdateSurveyDTO } from '../dtos/UpdateSurveyDTO';
import { UpdateQuestionDTO } from '../dtos/UpdateQuestionDTO';
import { AlreadyExistsException } from '../exceptions/AlreadyExistsException';

@Injectable()
export class SurveyService {
  constructor(
    private readonly surveyRepository: SurveyRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly passedSurveyRepository: PassedSurveyRepository,
  ) {}
  createSurvey(body: CreateSurveyDTO, userId: number): Promise<Survey> {
    return this.surveyRepository.create({ ...body, user_id: userId });
  }
  deleteSurvey(surveyId: number) {
    return this.surveyRepository.deleteById(surveyId);
  }
  async addQuestion(body: AddQuestionDTO, survey_id: number) {
    const { variants, text } = body;
    const question = await this.questionRepository.find({ survey_id, text });
    if (question) {
      throw new AlreadyExistsException('question');
    }
    return this.questionRepository.create({
      text,
      survey_id,
      answer_variants: {
        createMany: {
          data: variants.map((variant) => ({ text: variant })),
        },
      },
    });
  }
  deleteQuestion(questionId: number) {
    return this.questionRepository.delete({ id: questionId });
  }
  changeState(surveyId: number, state: SurveyState) {
    return this.surveyRepository.updateById(+surveyId, { state });
  }
  async takeSurvey(
    surveyId: number,
    { answerIds }: TakeSurveyDTO,
    userId: number,
  ) {
    const passedSurvey = await this.passedSurveyRepository.find({
      survey_id: surveyId,
      user_id: userId,
    });

    if (passedSurvey) {
      throw new SurveyAlreadyTakenException();
    }

    await this.checkAnswers(surveyId, answerIds);

    return this.passedSurveyRepository.create({
      survey_id: surveyId,
      user_id: userId,
      answers: {
        createMany: {
          data: answerIds.map((answerId) => ({ variant_id: answerId })),
        },
      },
    });
  }

  async changePassedSurvey(
    surveyId: number,
    { answerIds }: TakeSurveyDTO,
    userId: number,
  ) {
    const passedSurvey = await this.passedSurveyRepository.find({
      survey_id: surveyId,
      user_id: userId,
    });

    if (!passedSurvey) {
      return new SurveyNotTakenException();
    }

    await this.checkAnswers(surveyId, answerIds);

    return this.passedSurveyRepository.updateById(passedSurvey.id, {
      answers: {
        deleteMany: {},
        createMany: {
          data: answerIds.map((answerId) => ({ variant_id: answerId })),
        },
      },
    });
  }

  getAnswers(surveyId: number) {
    return this.passedSurveyRepository.findMany({ survey_id: surveyId });
  }

  getSurveyWithQuestions(surveyId: number) {
    return this.surveyRepository.findById(surveyId) as any as Promise<
      Survey & {
        questions: (Question & { answer_variants: AnswerVariant[] })[];
      }
    >;
  }

  async getQuestion(surveyId: number, questionId: number) {
    const question = this.questionRepository.find({
      survey_id: surveyId,
      id: questionId,
    });

    if (!question) {
      throw new NotBelongException('question', 'survey');
    }

    return question;
  }

  async getQuestionWithAnswers(surveyId: number, questionId: number) {
    const include = {
      answer_variants: {
        include: {
          answers: true,
        },
      },
    };
    const question = (await this.questionRepository.find(
      {
        survey_id: surveyId,
        id: questionId,
      },
      include,
    )) as any as DbQuestion;

    if (!question) {
      throw new NotBelongException('question', 'survey');
    }

    return question;
  }

  private async checkAnswers(surveyId: number, answerIds: number[]) {
    const survey = (await this.surveyRepository.find({
      id: surveyId,
    })) as any;

    if (survey.state !== SurveyState.OPENED) {
      throw new SurveyIsClosedException(survey.state);
    }

    if (survey.questions.length !== answerIds.length) {
      throw new WrongAnswersFormatException();
    }

    for (const question of survey.questions) {
      if (
        !question.answer_variants.some((variant) =>
          answerIds.includes(variant.id),
        )
      ) {
        throw new WrongAnswersFormatException();
      }
    }
  }
  updateSurvey(surveyId: number, body: UpdateSurveyDTO) {
    return this.surveyRepository.updateById(surveyId, body);
  }
  async updateQuestion(survey_id: number, id: number, body: UpdateQuestionDTO) {
    const question = await this.questionRepository.find({ id, survey_id });
    if (!question) {
      throw new NotBelongException('question', 'survey');
    }

    return this.questionRepository.updateById(id, {
      text: body.text,
      answer_variants: {
        deleteMany: {},
        createMany: {
          data: body.variants.map((variant) => ({ text: variant })),
        },
      },
    });
  }
  async shareLink(surveyId: number, req) {
    const survey = await this.surveyRepository.find({
      id: surveyId,
      state: SurveyState.OPENED,
    });
    if (!survey) {
      throw new SurveyIsClosedException(survey.state);
    }
    return `${req.headers.host}/survey/${surveyId}/questions`;
  }
}
