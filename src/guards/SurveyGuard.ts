import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { NotBelongException } from '../exceptions/NotBelongException';

@Injectable()
export class SurveyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const surveyId = +request.params.surveyId;
    const usersSurveys = request.user.surveys;

    if (!usersSurveys.some((survey) => survey.id === surveyId)) {
      throw new NotBelongException('Such survey', 'this user');
    }

    return true;
  }
}
