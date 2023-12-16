import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/PrismaService';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }
  find(where: Prisma.UserWhereInput) {
    return this.prismaService.user.findFirst({ where });
  }
  findById(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
      include: { role: true, surveys: true, passed_surveys: true },
    });
  }
  updateById(id: number, data: Prisma.UserUncheckedUpdateInput) {
    return this.prismaService.user.update({ where: { id }, data });
  }
  deleteById(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
