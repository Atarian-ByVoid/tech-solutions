import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from './user.dto';
import { parseString } from 'xml2js';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: pageSize,
      }),
      this.prisma.user.count(),
    ]);

    return {
      statusCode: 200,
      data,
      page,
      pageSize,
      totalItems: total,
    };
  }

  async findOne(id: number) {
    const dataTask = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    return {
      statusCode: 200,
      data: dataTask,
    };
  }
  async deleteUser(id: number): Promise<void> {
    const dataTask = await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDTO,
  ): Promise<UpdateUserDTO> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUserData: { [key: string]: any } = {};

    if (updateUserDto.username) {
      updatedUserData.username = updateUserDto.username;
    }
    if (updateUserDto.email) {
      updatedUserData.email = updateUserDto.email;
    }
    if (updateUserDto.password) {
      updatedUserData.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    if (updateUserDto.name) {
      updatedUserData.name = updateUserDto.name;
    }
    if (updateUserDto.address) {
      updatedUserData.address = updateUserDto.address;
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updatedUserData,
    });

    return {
      ...updatedUser,
    };
  }

  async findUnsafe(email: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }
}
