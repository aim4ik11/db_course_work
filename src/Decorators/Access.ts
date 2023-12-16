import { applyDecorators, UseGuards } from '@nestjs/common';
import { JWTGuard } from '../guards/JWTGuard';
import { Permission } from './Permission';
import { PermissionGuard } from '../guards/PermissionGuard';

export function Access(permission: string) {
  return applyDecorators(
    Permission(permission),
    UseGuards(JWTGuard, PermissionGuard),
  );
}
