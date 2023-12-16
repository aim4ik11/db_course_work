import { PipeTransform, Injectable } from '@nestjs/common';
import { DoesNotExistException } from '../exceptions/DoesNotExistException';
import { UserRepository } from '../repositories/UserRepository';

@Injectable()
export class UserByIdPipe implements PipeTransform {
  constructor(private readonly userRepository: UserRepository) {}
  async transform(userId: number) {
    const user = await this.userRepository.findById(+userId);
    if (!user) {
      throw new DoesNotExistException('user');
    }
    return +userId;
  }
}
