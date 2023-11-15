import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger'; // Importe as anotações necessárias
import { CreateUserDTO } from 'src/user/user.dto';
import { AuthUserDTO, UpdateRoleDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro na solicitação' })
  async createUser(@Body() createUserDto: CreateUserDTO) {
    try {
      const result = await this.authService.createUser(createUserDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Faz login de um usuário' })
  @ApiResponse({ status: 200, description: 'Login bem-sucedido' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() authUserDTO: AuthUserDTO) {
    try {
      const bearerToken = await this.authService.login(authUserDTO);
      return { token: bearerToken };
    } catch (error) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }

  @Put(':id/update-role')
  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualiza a função de um usuário por ID' })
  @ApiResponse({
    status: 200,
    description: 'Função do usuário atualizada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async updateUserRole(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRoleDTO,
  ) {
    const updatedUser = await this.authService.updateUserRole(
      id,
      updateRoleDto.role,
    );

    if (!updatedUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    return updatedUser;
  }
}
