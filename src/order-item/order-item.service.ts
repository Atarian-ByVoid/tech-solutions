import { Injectable, NotFoundException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from './dto/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(private prismaService: PrismaService) {}

  async createOrderItem(data: CreateOrderItemDTO) {
    const { productId, orderId, quantity, unitPrice } = data;

    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!product || !productId) {
      throw new NotFoundException('Product not found');
    }

    const order = await this.prismaService.orderItem.findUnique({
      where: { id: orderId },
    });

    if (!order || !orderId) {
      throw new NotFoundException('Order not found');
    }

    const createData = {
      productId,
      orderId,
      quantity,
      unitPrice: new Decimal(unitPrice),
    };

    const orderItem = await this.prismaService.orderItem.create({
      data: createData,
    });
    return orderItem;
  }

  async findAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.prismaService.orderItem.findMany({
        skip,
        take: pageSize,
      }),
      this.prismaService.orderItem.count(),
    ]);

    return {
      statusCode: 200,
      data,
      page,
      pageSize,
      totalItems: total,
    };
  }

  async findOne(id: number) {
    const dataOrderItem = await this.prismaService.orderItem.findFirst({
      where: {
        id,
      },
    });
    return {
      statusCode: 200,
      data: dataOrderItem,
    };
  }
  async deleteOrderItem(id: number): Promise<void> {
    await this.prismaService.orderItem.delete({
      where: {
        id,
      },
    });
  }

  async updateOrderItem(
    id: number,
    updateOrderItemDTO: UpdateOrderItemDTO,
  ): Promise<UpdateOrderItemDTO> {
    const orderItem = await this.prismaService.orderItem.findUnique({
      where: { id },
    });
    if (!orderItem) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const updateOrderItemData: { [key: string]: any } = {};

    if (updateOrderItemDTO.orderId) {
      updateOrderItemData.orderId = updateOrderItemDTO.orderId;
    }
    if (updateOrderItemDTO.productId) {
      updateOrderItemData.productId = updateOrderItemDTO.productId;
    }
    if (updateOrderItemDTO.quantity) {
      updateOrderItemData.quantity = updateOrderItemDTO.quantity;
    }
    if (updateOrderItemDTO.unitPrice) {
      updateOrderItemData.unitPrice = new Decimal(updateOrderItemDTO.unitPrice);
    }

    const updatedUser = await this.prismaService.orderItem.update({
      where: { id },
      data: updateOrderItemData,
    });

    return {
      ...updatedUser,
      unitPrice: updateOrderItemDTO.unitPrice.toString(),
    };
  }
}
