import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyRegisteredException extends HttpException {
  constructor() {
    super('User with such data is already registered', HttpStatus.BAD_REQUEST);
  }
}
