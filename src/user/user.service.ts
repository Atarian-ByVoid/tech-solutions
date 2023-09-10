import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from './user.dto';
import * as bcrypt from 'bcrypt';
import { parseString } from 'xml2js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // async mapXmlToCreateUserDto(xmlData: string): Promise<CreateUserDTO> {
  //   const userData = await this.parseXml(xmlData);

  //   const createUserDto: CreateUserDTO = {
  //     username: userData.username,
  //     email: userData.email,
  //     password: userData.password,
  //     name: userData.name,
  //     address: userData.address,
  //   };

  //   return createUserDto;
  // }
  // private async parseXml(xmlData: string): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     parseString(xmlData, (err, result) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         const userData = result.CreateUserDTO;
  //         resolve(userData);
  //       }
  //     });
  //   });
  // }

  // async createUserFromXml(xmlData: string): Promise<CreateUserDTO> {
  //   try {
  //     const createUserDto = await this.mapXmlToCreateUserDto(xmlData);
  //     const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

  //     const user = await this.prisma.user.create({
  //       data: {
  //         ...createUserDto,
  //         password: hashedPassword,
  //       },
  //     });

  //     return {
  //       username: user.username,
  //       email: user.email,
  //       name: user.name,
  //       address: user.address,
  //       password: user.password,
  //     };
  //   } catch (error) {
  //     throw new Error('Erro ao criar o usuário: ' + error.message);
  //   }
  // }
  async createUser(createUserDto: CreateUserDTO) {
    const { password, ...rest } = createUserDto;

    const createUserInput = {
      ...rest,
      password: await bcrypt.hash(password, 10),
    };

    try {
      const user = await this.prisma.user.create({
        data: createUserInput,
      });
      console.log(createUserDto);

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

  async findAll() {
    const dataTasks = await this.prisma.user.findMany({});
    return {
      statusCode: 200,
      data: dataTasks,
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
}
