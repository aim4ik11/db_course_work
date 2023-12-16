import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/PrismaService';
import { Prisma, Survey } from '@prisma/client';

@Injectable()
export class SurveyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private include = {
    questions: {
      include: {
        answer_variants: true,
      },
    },
  };
  create(data: Prisma.SurveyUncheckedCreateInput): Promise<Survey> {
    return this.prismaService.survey.create({ data });
  }
  deleteById(id: number) {
    return this.prismaService.survey.delete({ where: { id } });
  }
  updateById(
    id: number,
    data: Prisma.SurveyUncheckedUpdateInput,
  ): Promise<Survey> {
    return this.prismaService.survey.update({
      where: {
        id,
      },
      data,
    });
  }
  findById(id: number) {
    return this.prismaService.survey.findUnique({
      where: { id },
      include: this.include,
    });
  }
  find(where: Prisma.SurveyWhereInput): Promise<Survey> {
    return this.prismaService.survey.findFirst({
      where,
      include: this.include,
    });
  }
}
