import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductReviewController } from './product-review/product-review.controller';
import { ProductReviewService } from './product-review/product-review.service';

@Module({
  controllers: [ProductController,ProductReviewController],
  providers: [ProductService, PrismaService, ProductReviewService],
  imports: [PrismaModule],
})
export class ProductModule {}
