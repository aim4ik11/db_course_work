import { PermissionRepository } from '../repositories/PermissionRepository';
import { DoesNotExistException } from '../exceptions/DoesNotExistException';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PermissionByIdPipe implements PipeTransform {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async transform(permissionId: number) {
    const permission = await this.permissionRepository.findById(+permissionId);
    if (!permission) {
      throw new DoesNotExistException('permission');
    }

    return +permissionId;
  }
}
