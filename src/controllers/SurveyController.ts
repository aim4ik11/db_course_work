import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { SurveyService } from '../services/SurveyService';
import { CreateSurveyDTO } from '../dtos/CreateSurveyDTO';
import { Survey } from '@prisma/client';
import { AddQuestionDTO } from '../dtos/AddQuestionDTO';
import { QuestionByIdPipe } from '../pipes/QuestionByIdPipe';
import { ChangeStateDTO } from '../dtos/ChangeStateDTO';
import { TakeSurveyDTO } from '../dtos/TakeSurveyDTO';
import { SurveyByIdPipe } from '../pipes/SurveyByIdPipe';
import { SurveyMapper } from '../mappers/SurveyMapper';
import { QuestionMapper } from '../mappers/QuestionMapper';
import { Access } from '../Decorators/Access';
import { UpdateSurveyDTO } from '../dtos/UpdateSurveyDTO';
import { UpdateQuestionDTO } from '../dtos/UpdateQuestionDTO';

@Controller('/survey')
export class SurveyController {
  constructor(
    private readonly surveyService: SurveyService,
    private readonly surveyMapper: SurveyMapper,
    private readonly questionMapper: QuestionMapper,
  ) {}

  @Access('survey.create')
  @Post()
  createSurvey(@Body() body: CreateSurveyDTO, @Req() req): Promise<Survey> {
    return this.surveyService.createSurvey(body, req.user.id);
  }
  @Access('survey.$surveyId.delete')
  @Delete('/:surveyId')
  deleteSurvey(@Param('surveyId', SurveyByIdPipe) surveyId: number) {
    return this.surveyService.deleteSurvey(surveyId);
  }
  @Access('survey.$surveyId.update')
  @Patch('/:surveyId')
  updateSurvey(
    @Param('surveyId', SurveyByIdPipe) surveyId: number,
    @Body() body: UpdateSurveyDTO,
  ) {
    return this.surveyService.updateSurvey(surveyId, body);
  }
  @Access('survey.$surveyId.add.question')
  @Post('/:surveyId/question')
  addQuestion(
    @Body() body: AddQuestionDTO,
    @Param('surveyId', SurveyByIdPipe) surveyId: number,
  ) {
    return this.surveyService.addQuestion(body, surveyId);
  }
  @Access('survey.$surveyId.delete.question.$questionId')
  @Delete('/:surveyId/question/:questionId')
  deleteQuestion(
    @Param('surveyId', SurveyByIdPipe) surveyId: number,
    @Param('questionId', QuestionByIdPipe) questionId: number,
  ) {
    return this.surveyService.deleteQuestion(questionId);
  }
  @Access('survey.$surveyId.update.question.$questionId')
  @Patch('/:surveyId/question/:questionId')
  updateQuestion(
    @Param('surveyId', SurveyByIdPipe) surveyId: number,
    @Param('questionId', QuestionByIdPipe) questionId: number,
    @Body() body: UpdateQuestionDTO,
  ) {
    return this.surveyService.updateQuestion(surveyId, questionId, body);
  }
  @Access('survey.$surveyId.change.state')
  @Patch('/:surveyId/state')
  changeState(
    @Param('surveyId', SurveyByIdPipe) surveyId: number,
    @Body() body: ChangeStateDTO,
  ) {
    return this.surveyService.changeState(surveyId, body.state);
  }
  @Access('survey.surveyId.take')
  @Post('/:surveyId/answers')
  takeSurvey(
    @Body() body: TakeSurveyDTO,
    @Param('surveyId', SurveyByIdPipe) surveyId: number,
    @Req() req,
  ) {
    return this.surveyService.takeSurvey(surveyId, body, req.user.id);
  }
  @Access('survey.surveyId.retake')
  @Patch('/:surveyId/answers')
  changePassedSurvey(
    @Body() body: TakeSurveyDTO,
    @Param('surveyId', SurveyByIdPipe) surveyId: number,
    @Req() req,
  ) {
    return this.surveyService.changePassedSurvey(surveyId, body, req.user.id);
  }
  @Access('survey.$surveyId.get.answers')
  @Get('/:surveyId/answers')
  getAnswers(@Param('surveyId', SurveyByIdPipe) surveyId: number) {
    return this.surveyService.getAnswers(surveyId);
  }
  @Access('survey.surveyId.get.questions')
  @Get('/:surveyId/questions')
  async getQuestions(@Param('surveyId', SurveyByIdPipe) surveyId: number) {
    const survey = await this.surveyService.getSurveyWithQuestions(surveyId);
    return this.surveyMapper.getSurveyWithQuestions(survey);
  }
  @Access('survey.surveyId.get.questions.$questionId')
  @Get('/:surveyId/questions/:questionId')
  getQuestion(
    @Param('surveyId', SurveyByIdPipe) surveyId: number,
    @Param('questionId', QuestionByIdPipe) questionId: number,
  ) {
    return this.surveyService.getQuestion(surveyId, questionId);
  }
  @Access('survey.$surveyId.get.answers.$questionId')
  @Get('/:surveyId/answers/:questionId')
  async getQuestionWithAnswers(
    @Param('surveyId', SurveyByIdPipe) surveyId: number,
    @Param('questionId', QuestionByIdPipe) questionId: number,
  ) {
    const question = await this.surveyService.getQuestionWithAnswers(
      surveyId,
      questionId,
    );
    return this.questionMapper.getQuestionWithAnswers(question);
  }
  @Access('survey.$surveyId.share')
  @Get('/:surveyId/share')
  shareSurvey(@Param('surveyId', SurveyByIdPipe) surveyId: number, @Req() req) {
    return this.surveyService.shareLink(surveyId, req);
  }
}
