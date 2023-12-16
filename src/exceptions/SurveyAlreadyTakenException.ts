import { HttpException, HttpStatus } from '@nestjs/common';

export class SurveyAlreadyTakenException extends HttpException {
  constructor() {
    super(`This survey has been already taken`, HttpStatus.BAD_REQUEST);
  }
}
