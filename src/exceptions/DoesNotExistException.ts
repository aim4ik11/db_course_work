import { HttpException, HttpStatus } from '@nestjs/common';

export class DoesNotExistException extends HttpException {
  constructor(what: string) {
    super(`This ${what} does not exist`, HttpStatus.BAD_REQUEST);
  }
}
