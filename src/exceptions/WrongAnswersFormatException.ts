import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongAnswersFormatException extends HttpException {
  constructor() {
    super("Wrong answer's format for this survey", HttpStatus.BAD_REQUEST);
  }
}
