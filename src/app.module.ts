import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { OrderController } from './order/order.controller';
import { XMLMiddleware } from './middleware/xml';
import { ProductReviewController } from './product/product-review/product-review.controller';
import { ProductService } from './product/product.service';
import { PrismaService } from './prisma/prisma.service';
import { ProductReviewService } from './product/product-review/product-review.service';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    UsersModule,
    ProductModule,
    AuthModule,
    OrderModule,
  ],
  controllers: [AuthController, OrderController, ProductReviewController],
  providers: [
    AuthService,
    ProductService,
    PrismaService,
    ProductReviewService,
    UsersService,
    JwtService,
  ],
})
export class AppModule {}
