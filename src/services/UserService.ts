import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async setRole(userId: number, role_id: number) {
    return this.userRepository.updateById(userId, {
      role_id,
    });
  }
  deleteUser(userId: number) {
    return this.userRepository.deleteById(userId);
  }
  findUser(userId: number) {
    return this.userRepository.findById(userId);
  }
  updateUser(userId: number, body: UpdateUserDTO) {
    return this.userRepository.updateById(userId, body);
  }
}
