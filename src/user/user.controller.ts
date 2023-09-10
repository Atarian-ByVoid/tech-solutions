import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { parseString } from 'xml2js';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDTO) {
    try {
      const result = await this.userService.createUser(createUserDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(+id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDTO,
  ) {
    try {
      const updatedUser = await this.userService.updateUser(+id, updateUserDto);
      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }


}
