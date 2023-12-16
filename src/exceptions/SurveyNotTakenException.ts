import { HttpException, HttpStatus } from '@nestjs/common';

export class SurveyNotTakenException extends HttpException {
  constructor() {
    super(`This survey has not been taken`, HttpStatus.BAD_REQUEST);
  }
}
