import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { OrderService } from './order.service';
import { CreateOrderDTO, UpdateOrderDTO } from './dtos/order.dto';
import { UpdateProductDTO } from 'src/product/dto/product.dto';

@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async createProduct(@Body() CreateOrderDTO: CreateOrderDTO) {
    try {
      const result = await this.orderService.createOrder(CreateOrderDTO);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      return await this.orderService.findAll(page, pageSize);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.orderService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.orderService.deleteOrder(+id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateOrderDTO: UpdateOrderDTO,
  ) {
    try {
      const updateOrder = await this.orderService.updateOrder(
        +id,
        updateOrderDTO,
      );
      if (!updateOrder) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return updateOrder;
    } catch (error) {
      throw error;
    }
  }
}
