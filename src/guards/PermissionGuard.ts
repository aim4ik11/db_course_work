import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userRepository: UserRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: User }>();
    const user = request.user;

    const permission = this.reflector.get('permission', context.getHandler());

    const hasPermission = await this.userRepository.find({
      id: user.id,
      role: {
        permissions: {
          some: {
            permission: {
              name: permission,
            },
          },
        },
      },
    });

    if (!hasPermission) {
      throw new ForbiddenException('This user has no permission to do this');
    }
    if (permission.includes('$surveyId')) {
      const surveyId = this.getField(request, 'surveyId');
      await this.checkSurvey(user.id, surveyId);
    }
    if (permission.includes('$userId')) {
      const userId = this.getField(request, 'userId');
      await this.checkUser(user.id, userId);
    }
    return true;
  }
  getField(request: Request, field: string) {
    const result =
      request.params[field] ?? request.query[field] ?? request.body[field];

    if (!result) {
      throw new ForbiddenException('This user has no permission to do this');
    }
    return result;
  }
  async checkSurvey(userId: number, surveyId: number) {
    const user = await this.userRepository.find({
      id: userId,
      surveys: {
        some: {
          id: +surveyId,
        },
      },
    });

    if (!user) {
      throw new ForbiddenException('This user has no permission to do this');
    }
  }
  async checkUser(currentUserId: number, userId: number) {
    const currentUser = await this.userRepository.findById(currentUserId);
    if (+userId !== currentUserId) {
      if (currentUser.role.name !== 'Admin') {
        throw new ForbiddenException('This user has no permission to do this');
      }
    }
  }
}
