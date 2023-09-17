import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductReviewDTO, UpdateProductReviewDTO } from '../dto/product-review.dto';

@Injectable()
export class ProductReviewService {
  constructor(private prismaService: PrismaService) {}

  async createReview(
    data: CreateProductReviewDTO,
  ): Promise<CreateProductReviewDTO> {
    const { userId, productId, rating, comment } = data;
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!user || !product) {
      throw new NotFoundException('User or product not found');
    }

    const productReview = await this.prismaService.productReview.create({
      data: {
        userId,
        productId,
        rating,
        comment,
      },
    });
    return productReview;
  }

  async findAll() {
    const dataTasks = await this.prismaService.productReview.findMany({});
    return {
      statusCode: 200,
      data: dataTasks,
    };
  }

  async findOne(id: number) {
    const dataTask = await this.prismaService.productReview.findFirst({
      where: {
        id,
      },
    });
    return {
      statusCode: 200,
      data: dataTask,
    };
  }
  async delete(id: number): Promise<void> {
    await this.prismaService.productReview.delete({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateProductReviewDTO: UpdateProductReviewDTO,
  ): Promise<UpdateProductReviewDTO> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const updatedUserData: { [key: string]: any } = {};

    if (updateProductReviewDTO.rating) {
      updatedUserData.rating = updateProductReviewDTO.rating;
    }
    if (updateProductReviewDTO.comment) {
      updatedUserData.comment = updateProductReviewDTO.comment;
    }

    const productReview = await this.prismaService.productReview.update({
      where: { id },
      data: updatedUserData,
    });

    return {
      ...productReview,
    };
  }
}
