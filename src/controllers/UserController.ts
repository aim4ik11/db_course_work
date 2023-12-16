import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from '../services/UserService';
import { UserByIdPipe } from '../pipes/UserByIdPipe';
import { RoleByIdPipe } from '../pipes/RoleByIdPipe';
import { UserMapper } from '../mappers/UserMapper';
import { Access } from '../Decorators/Access';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  @Access('admin.set.user.$userId.role.$roleId')
  @Patch('/:userId/role/:roleId')
  setRole(
    @Param('userId', UserByIdPipe) userId: number,
    @Param('roleId', RoleByIdPipe) roleId: number,
  ) {
    return this.userService.setRole(userId, roleId);
  }
  @Access('admin.delete.user.$userId')
  @Delete('/:userId')
  deleteUser(@Param('userId', UserByIdPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }
  @Access('user.$userId.get')
  @Get('/:userId')
  async getUser(@Param('userId', UserByIdPipe) userId: number) {
    const user = await this.userService.findUser(userId);
    return this.userMapper.getUser(user);
  }
  @Access('user.$userId.update')
  @Patch('/:userId')
  updateUser(
    @Param('userId', UserByIdPipe) userId: number,
    @Body() body: UpdateUserDTO,
  ) {
    return this.userService.updateUser(userId, body);
  }
}
