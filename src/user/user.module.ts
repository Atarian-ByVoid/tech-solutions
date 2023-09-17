import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthController } from 'src/auth/auth.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AuthService],
  imports: [PrismaModule, forwardRef(() => AuthModule)],
})
export class UsersModule {}
