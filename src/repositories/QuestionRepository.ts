import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuestionRepository {
  constructor(private readonly prismaService: PrismaService) {}
  private include = { answer_variants: true };

  create(data: Prisma.QuestionUncheckedCreateInput) {
    return this.prismaService.question.create({ data, include: this.include });
  }

  delete(where: Prisma.QuestionWhereUniqueInput) {
    return this.prismaService.question.delete({ where, include: this.include });
  }

  find(
    where: Prisma.QuestionWhereInput,
    include: Prisma.QuestionInclude = this.include,
  ) {
    return this.prismaService.question.findFirst({
      where,
      include,
    });
  }
  findById(id: number) {
    return this.prismaService.question.findUnique({
      where: { id },
      include: this.include,
    });
  }
  updateById(id: number, data: Prisma.QuestionUncheckedUpdateInput) {
    return this.prismaService.question.update({ where: { id }, data });
  }
}
