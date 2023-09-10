import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';


@Module({
  imports: [UsersModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
