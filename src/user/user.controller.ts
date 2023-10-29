import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { UpdateUserDTO } from './user.dto';
import { UsersService } from './user.service';

@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Recupera todos os usuários' })
  @ApiResponse({ status: 200, description: 'Usuários recuperados com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro na solicitação' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      return await this.userService.findAll(page, pageSize);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recupera um usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário recuperado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui um usuário por ID' })
  @ApiResponse({ status: 204, description: 'Usuário excluído com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDTO,
  ) {
    try {
      const updatedUser = await this.userService.updateUser(+id, updateUserDto);
      if (!updatedUser) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}
