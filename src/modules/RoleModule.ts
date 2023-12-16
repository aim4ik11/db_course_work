import { Module } from '@nestjs/common';
import { PrismaModule } from './PrismaModule';
import { RoleController } from '../controllers/RoleController';
import { RoleService } from '../services/RoleService';
import { PermissionByIdPipe } from '../pipes/PermissionByIdPipe';
import { CreateRolePipe } from '../pipes/CreateRolePipe';
import { RoleByIdPipe } from '../pipes/RoleByIdPipe';

@Module({
  imports: [PrismaModule],
  exports: [RoleService, PermissionByIdPipe, CreateRolePipe, RoleByIdPipe],
  providers: [RoleService, PermissionByIdPipe, CreateRolePipe, RoleByIdPipe],
  controllers: [RoleController],
})
export class RoleModule {}
