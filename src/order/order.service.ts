import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDTO, UpdateOrderDTO } from './dtos/order.dto';
import { Status } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  async createOrder(data: CreateOrderDTO) {
    const { userId, status } = data;
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user || !userId) {
      throw new NotFoundException('User not found');
    }

    const createData = {
      userId,
      status,
    };

    const order = await this.prismaService.order.create({
      data: createData,
    });
    return order;
  }

  async findAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.prismaService.order.findMany({
        skip,
        take: pageSize,
      }),
      this.prismaService.order.count(),
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
    const dataTask = await this.prismaService.order.findFirst({
      where: {
        id,
      },
    });
    return {
      statusCode: 200,
      data: dataTask,
    };
  }
  async deleteOrder(id: number): Promise<void> {
    await this.prismaService.order.delete({
      where: {
        id,
      },
    });
  }

  async updateOrder(
    id: number,
    updateOrderDTO: UpdateOrderDTO,
  ): Promise<UpdateOrderDTO> {
      const order = await this.prismaService.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const updatedUserData: { [key: string]: any } = {};

    if (updateOrderDTO.userId) {
      updatedUserData.userId = updateOrderDTO.userId;
    }
    if (updateOrderDTO.status) {
      updatedUserData.status = updateOrderDTO.status;
    }

    const updatedUser = await this.prismaService.order.update({
      where: { id },
      data: updatedUserData,
    });

    return {
      ...updatedUser,
    };
  }
}
