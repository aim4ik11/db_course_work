import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { RoleService } from '../services/RoleService';
import { CreateRoleDTO } from '../dtos/CreateRoleDTO';
import { CreateRolePipe } from '../pipes/CreateRolePipe';
import { CreatePermissionDTO } from '../dtos/CreatePermissionDTO';
import { PermissionByIdPipe } from '../pipes/PermissionByIdPipe';
import { RoleByIdPipe } from '../pipes/RoleByIdPipe';
import { Access } from '../Decorators/Access';

@Controller('/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Access('admin.role.create')
  @Post()
  createRole(@Body(CreateRolePipe) body: CreateRoleDTO) {
    return this.roleService.createRole(body);
  }
  @Access('admin.role.$roleId.delete')
  @Delete('/:roleId')
  deleteRole(@Param('roleId', RoleByIdPipe) roleId: number) {
    return this.roleService.deleteRole(roleId);
  }
  @Access('admin.role.$roleId.add.permission.$permissionId')
  @Post('/:roleId/permission/:permissionId')
  addPermission(
    @Param('roleId', RoleByIdPipe) roleId: number,
    @Param('permissionId', PermissionByIdPipe) permissionId: number,
  ) {
    return this.roleService.addPermission(roleId, permissionId);
  }
  @Access('admin.role.$roleId.delete.permission.$permissionId')
  @Delete('/:roleId/permission/:permissionId')
  removePermission(
    @Param('roleId', RoleByIdPipe) roleId: number,
    @Param('permissionId', PermissionByIdPipe) permissionId: number,
  ) {
    return this.roleService.removePermission(roleId, permissionId);
  }
  @Access('admin.permission.create')
  @Post('/permission')
  createPermission(@Body() body: CreatePermissionDTO) {
    return this.roleService.createPermission(body);
  }
  @Access('admin.permission.$permissionId.delete')
  @Delete('/permission/:permissionId')
  deletePermission(
    @Param('permissionId', PermissionByIdPipe) permissionId: number,
  ) {
    return this.roleService.deletePermission(permissionId);
  }
}
