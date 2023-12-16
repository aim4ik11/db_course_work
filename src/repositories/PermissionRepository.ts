import { PrismaService } from '../services/PrismaService';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PermissionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.PermissionUncheckedCreateInput) {
    return this.prismaService.permission.create({ data });
  }
  findById(id: number) {
    return this.prismaService.permission.findUnique({ where: { id } });
  }
}
