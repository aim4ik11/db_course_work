import { Module } from '@nestjs/common';
import { PrismaService } from '../services/PrismaService';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { UserRepository } from '../repositories/UserRepository';
import { QuestionRepository } from '../repositories/QuestionRepository';
import { PassedSurveyRepository } from '../repositories/PassedSurveyRepository';
import { RoleRepository } from '../repositories/RoleRepository';
import { PermissionRepository } from '../repositories/PermissionRepository';

@Module({
  exports: [
    PrismaService,
    SurveyRepository,
    UserRepository,
    QuestionRepository,
    PassedSurveyRepository,
    RoleRepository,
    PermissionRepository,
  ],
  providers: [
    PrismaService,
    SurveyRepository,
    UserRepository,
    QuestionRepository,
    PassedSurveyRepository,
    RoleRepository,
    PermissionRepository,
  ],
})
export class PrismaModule {}
