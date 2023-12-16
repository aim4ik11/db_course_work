import { PipeTransform, Injectable } from '@nestjs/common';
import { DoesNotExistException } from '../exceptions/DoesNotExistException';
import { RoleRepository } from '../repositories/RoleRepository';

@Injectable()
export class RoleByIdPipe implements PipeTransform {
  constructor(private readonly roleRepository: RoleRepository) {}
  async transform(roleId: number) {
    const role = await this.roleRepository.findById(+roleId);
    if (!role) {
      throw new DoesNotExistException('role');
    }
    return +roleId;
  }
}
