import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from './dto/order-item.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

// @ApiSecurity('bearer')
// @UseGuards(JwtAuthGuard)
@ApiTags('Order Item')
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  create(@Body() createOrderItemDTO: CreateOrderItemDTO) {
    return this.orderItemService.createOrderItem(createOrderItemDTO);
  }
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      return await this.orderItemService.findAll(page, pageSize);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.orderItemService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteOrderItem(@Param('id') id: string) {
    return await this.orderItemService.deleteOrderItem(+id);
  }

  @Put(':id')
  async updateOrderItem(
    @Param('id') id: string,
    @Body() updateOrderItemDTO: UpdateOrderItemDTO,
  ) {
    try {
      const updateOrder = await this.orderItemService.updateOrderItem(
        +id,
        updateOrderItemDTO,
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
