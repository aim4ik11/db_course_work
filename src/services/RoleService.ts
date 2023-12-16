import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../repositories/RoleRepository';
import { CreateRoleDTO } from '../dtos/CreateRoleDTO';
import { CreatePermissionDTO } from '../dtos/CreatePermissionDTO';
import { PermissionRepository } from '../repositories/PermissionRepository';
import { AlreadyExistsException } from '../exceptions/AlreadyExistsException';
import { DoesNotExistException } from '../exceptions/DoesNotExistException';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  createRole(body: CreateRoleDTO) {
    return this.roleRepository.create({
      name: body.name,
      permissions: {
        createMany: {
          data: body.permissions.map((permissionId) => ({
            permission_id: permissionId,
          })),
        },
      },
    });
  }
  deleteRole(roleId: number) {
    return this.roleRepository.deleteById(roleId);
  }
  createPermission(body: CreatePermissionDTO) {
    return this.permissionRepository.create(body);
  }
  async addPermission(roleId: number, permissionId: number) {
    const roleHasPermission = await this.roleRepository.findRoleHasPermission(
      roleId,
      permissionId,
    );
    if (roleHasPermission) {
      throw new AlreadyExistsException('roleHasPermission');
    }
    return this.roleRepository.createRoleHasPermission(roleId, permissionId);
  }
  async removePermission(roleId: number, permissionId: number) {
    const roleHasPermission = await this.roleRepository.findRoleHasPermission(
      roleId,
      permissionId,
    );
    if (!roleHasPermission) {
      throw new DoesNotExistException('roleHasPermission');
    }
    return this.roleRepository.deleteRoleHasPermission(roleId, permissionId);
  }
  deletePermission(permissionId: number) {
    return this.roleRepository.deletePermission(permissionId);
  }
}
