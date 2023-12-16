import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExistsException extends HttpException {
  constructor(what: string) {
    super(`This ${what} already exists`, HttpStatus.BAD_REQUEST);
  }
}
