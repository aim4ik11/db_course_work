import { Module } from '@nestjs/common';
import { SurveyService } from '../services/SurveyService';
import { SurveyController } from '../controllers/SurveyController';
import { PrismaModule } from './PrismaModule';
import { SurveyByIdPipe } from '../pipes/SurveyByIdPipe';
import { SurveyMapper } from '../mappers/SurveyMapper';
import { QuestionMapper } from '../mappers/QuestionMapper';

@Module({
  imports: [PrismaModule],
  exports: [SurveyService, SurveyByIdPipe, SurveyMapper, QuestionMapper],
  providers: [SurveyService, SurveyByIdPipe, SurveyMapper, QuestionMapper],
  controllers: [SurveyController],
})
export class SurveyModule {}
