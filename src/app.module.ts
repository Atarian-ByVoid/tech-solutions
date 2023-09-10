import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';



@Module({
  imports: [UsersModule, ProductModule, AuthModule, OrderModule],
  controllers: [AuthController, OrderController],
  providers: [AuthService, OrderService],
})
export class AppModule {}
