import { Body, Controller, NotFoundException, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/user.dto';
import {
  ApiTags,
} from '@nestjs/swagger';
import { AuthUserDTO, UpdateRoleDTO } from './auth.dto';
import { Role } from '@prisma/client';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDTO) {
    try {
      const result = await this.authService.createUser(createUserDto);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  @Post('login')
  async login(@Body() authUserDTO: AuthUserDTO) {
    try {
      const bearerToken = await this.authService.login(authUserDTO);
      return { token: bearerToken };
    } catch (error) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }

  @Put(':id/update-role')
  async updateUserRole(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDTO) {
    const updatedUser = await this.authService.updateUserRole(id, updateRoleDto.role);

    if (!updatedUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    return updatedUser;
  }
}
