import { HttpException, HttpStatus } from '@nestjs/common';

export class NotBelongException extends HttpException {
  constructor(what: string, where: string) {
    super(`${what} does not belong to ${where}`, HttpStatus.BAD_REQUEST);
  }
}
