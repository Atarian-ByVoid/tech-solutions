// auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/user/user.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_KEY'), 
        signOptions: { expiresIn: '1d' },
      }),
    }),
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy, PrismaService, UsersService, JwtService], 
  controllers: [AuthController], 
  exports: [JwtService], 
})
export class AuthModule {}
