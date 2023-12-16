import { PipeTransform, Injectable } from '@nestjs/common';
import { DoesNotExistException } from '../exceptions/DoesNotExistException';
import { SurveyRepository } from '../repositories/SurveyRepository';

@Injectable()
export class SurveyByIdPipe implements PipeTransform {
  constructor(private readonly surveyRepository: SurveyRepository) {}
  async transform(surveyId: number) {
    const survey = await this.surveyRepository.findById(+surveyId);
    if (!survey) {
      throw new DoesNotExistException('survey');
    }
    return +surveyId;
  }
}
