import { HttpException, HttpStatus } from '@nestjs/common';
import { SurveyState } from '@prisma/client';

export class SurveyIsClosedException extends HttpException {
  constructor(state: SurveyState) {
    super(`This survey is ${state.toLowerCase()}`, HttpStatus.BAD_REQUEST);
  }
}
