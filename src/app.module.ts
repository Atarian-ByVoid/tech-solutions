import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { InventoryModule } from './inventory/inventory.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderModule } from './order/order.module';
import { PrismaService } from './prisma/prisma.service';
import { ProductReviewController } from './product/product-review/product-review.controller';
import { ProductReviewService } from './product/product-review/product-review.service';
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { UsersModule } from './user/user.module';
import { UsersService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    UsersModule,
    ProductModule,
    AuthModule,
    OrderModule,
    InventoryModule,
    OrderItemModule,
  ],
  controllers: [AuthController, ProductReviewController],
  providers: [
    AuthService,
    ProductService,
    PrismaService,
    ProductReviewService,
    UsersService,
    JwtService,
  ],
})
export class AppModule { }
