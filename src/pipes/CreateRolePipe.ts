import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateRoleDTO } from '../dtos/CreateRoleDTO';
import { RoleRepository } from '../repositories/RoleRepository';
import { AlreadyExistsException } from '../exceptions/AlreadyExistsException';
import { PermissionByIdPipe } from './PermissionByIdPipe';

@Injectable()
export class CreateRolePipe implements PipeTransform {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionById: PermissionByIdPipe,
  ) {}

  async transform(body: CreateRoleDTO) {
    const role = await this.roleRepository.find({ name: body.name });

    if (role) {
      throw new AlreadyExistsException('role');
    }

    for (const permissionId of body.permissions) {
      await this.permissionById.transform(permissionId);
    }

    return body;
  }
}
