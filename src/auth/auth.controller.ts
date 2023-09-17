import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthUserDTO, BearerTokenDTO } from './auth.dto';

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

  // @Post('login')
  // @ApiResponse({
  //   status: 200,
  //   type: BearerTokenDTO,
  // })
  // @ApiOperation({
  //   summary: 'Realiza o login no sistema a partir de uma empresa cadastrada',
  // })
  // @ApiBadRequestResponse({ description: 'Requisição inválida' })
  // @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  // @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  // @ApiCreatedResponse({
  //   description: 'Login realizado com sucesso',
  // })
  // async login(@Body() authUserDTO: AuthUserDTO): Promise<BearerTokenDTO> {
  //   try {
  //     return await this.authService.login(authUserDTO);
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }

  @Post('login')
  async login(@Body() authUserDTO: AuthUserDTO) {
    try {
      const bearerToken = await this.authService.login(authUserDTO);
      return { token: bearerToken };
    } catch (error) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }


}
