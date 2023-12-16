import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/PrismaService';
import { PassedSurvey, Prisma } from '@prisma/client';

@Injectable()
export class PassedSurveyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private include = {
    answers: {
      include: {
        variant: true,
      },
    },
  };

  create(data: Prisma.PassedSurveyUncheckedCreateInput): Promise<PassedSurvey> {
    return this.prismaService.passedSurvey.create({
      data,
      include: this.include,
    });
  }

  updateById(
    id: number,
    data: Prisma.PassedSurveyUncheckedUpdateInput,
  ): Promise<PassedSurvey> {
    return this.prismaService.passedSurvey.update({
      where: { id },
      data,
      include: this.include,
    });
  }

  find(where: Prisma.PassedSurveyWhereInput) {
    return this.prismaService.passedSurvey.findFirst({
      where,
      include: this.include,
    });
  }

  findMany(where: Prisma.PassedSurveyWhereInput) {
    return this.prismaService.passedSurvey.findMany({
      where,
      include: this.include,
    });
  }
}
