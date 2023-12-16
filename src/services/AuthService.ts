import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UserAlreadyRegisteredException } from '../exceptions/UserAlreadyRegisteredException';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(body: CreateUserDTO) {
    const { password, ...securityUser } = body;
    const user = await this.userRepository.find({
      OR: [{ email: body.email }, { nickname: body.nickname }],
    });

    if (user) {
      throw new UserAlreadyRegisteredException();
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.userRepository.create({
      password: hashedPassword,
      ...securityUser,
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.find({ email });
    if (!user) {
      throw new UnauthorizedException(
        'User with such email or password does not exist',
      );
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException(
        'User with such email or password does not exist',
      );
    }

    delete user.password;
    return user;
  }

  getAccessToken(userId: number) {
    const payload = { sub: userId };
    return this.jwtService.sign(payload);
  }
}
