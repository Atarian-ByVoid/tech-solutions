import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/user/user.service';
import { OrderService } from './order.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderController } from './order.controller';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, UsersService],
  imports: [PrismaModule],
})
export class OrderModule {}
