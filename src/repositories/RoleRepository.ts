import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleRepository {
  constructor(private readonly prismaRepository: PrismaService) {}

  create(data: Prisma.RoleUncheckedCreateInput) {
    return this.prismaRepository.role.create({ data });
  }
  deleteById(id: number) {
    return this.prismaRepository.role.delete({ where: { id } });
  }
  find(where: Prisma.RoleWhereInput) {
    return this.prismaRepository.role.findFirst({ where });
  }
  findById(id: number) {
    return this.prismaRepository.role.findUnique({ where: { id } });
  }
  updateById(id: number, data: Prisma.RoleUncheckedUpdateInput) {
    return this.prismaRepository.role.update({ where: { id }, data });
  }
  createRoleHasPermission(role_id: number, permission_id: number) {
    return this.prismaRepository.roleHasPermission.create({
      data: {
        role_id,
        permission_id,
      },
    });
  }
  deleteRoleHasPermission(role_id: number, permission_id: number) {
    return this.prismaRepository.roleHasPermission.delete({
      where: {
        role_id_permission_id: { role_id, permission_id },
      },
    });
  }
  findRoleHasPermission(role_id: number, permission_id: number) {
    return this.prismaRepository.roleHasPermission.findUnique({
      where: {
        role_id_permission_id: { role_id, permission_id },
      },
    });
  }
  deletePermission(id: number) {
    return this.prismaRepository.permission.delete({
      where: { id },
    });
  }
}
