import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/user.dto';
import {
  ApiTags,
} from '@nestjs/swagger';
import { AuthUserDTO } from './auth.dto';

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
}
