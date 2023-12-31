import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from 'src/user/user.dto';
import * as bcrypt from 'bcrypt';
import { AuthUserDTO, BearerTokenDTO } from './auth.dto';
import { Role, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDTO) {
    const { password, ...rest } = createUserDto;

    const createUserInput = {
      ...rest,
      password: await bcrypt.hash(password, 10),
    };

    try {
      const user = await this.prismaService.user.create({
        data: createUserInput,
      });

      return {
        statusCode: 200,
        data: user,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Já existe um usuário com este email.');
      }

      throw new InternalServerErrorException(
        'Erro ao criar o usuário: ' + error.message,
      );
    }
  }

  async login(body: AuthUserDTO) {
    const payload = {
      email: body.email,
    };

    const user = await this.validateUser(payload);

    if (!user) {
      throw new UnauthorizedException('Usuário não cadastrado.');
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta.');
    }

    const secretKey = 'void';

    if (user.role) {
      payload['role'] = user.role;
    }

    return this.jwtService.sign(
      { ...payload, sub: user.id },
      { secret: secretKey },
    );
  }

  async validateUser(payload: any): Promise<User | null> {
    try {
      const { email } = payload;

      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao validar o usuário: ' + error.message,
      );
    }
  }

  async updateUserRole(userId: number, newRole: Role): Promise<User | null> {
    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id: userId },
        data: { role: newRole },
      });

      return updatedUser;
    } catch (error) {
      console.error('Erro ao atualizar o papel do usuário:', error);
      throw new NotFoundException('Erro ao atualizar o papel do usuário.');
    }
  }

}
