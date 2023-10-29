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
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from './dto/order-item.dto';
import { OrderItemService } from './order-item.service';

@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
@ApiTags('Order Item')
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo item de pedido' })
  @ApiResponse({
    status: 201,
    description: 'Item de pedido criado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro na solicitação' })
  create(@Body() createOrderItemDTO: CreateOrderItemDTO) {
    return this.orderItemService.createOrderItem(createOrderItemDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Recupera todos os itens de pedido' })
  @ApiResponse({
    status: 200,
    description: 'Itens de pedido recuperados com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro na solicitação' })
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
  @ApiOperation({ summary: 'Recupera um item de pedido por ID' })
  @ApiResponse({
    status: 200,
    description: 'Item de pedido recuperado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Item de pedido não encontrado' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.orderItemService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui um item de pedido por ID' })
  @ApiResponse({
    status: 204,
    description: 'Item de pedido excluído com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Item de pedido não encontrado' })
  async deleteOrderItem(@Param('id') id: string) {
    return await this.orderItemService.deleteOrderItem(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um item de pedido por ID' })
  @ApiResponse({
    status: 200,
    description: 'Item de pedido atualizado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Item de pedido não encontrado' })
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
        throw new NotFoundException(
          `Item de pedido com ID ${id} não encontrado`,
        );
      }
      return updateOrder;
    } catch (error) {
      throw error;
    }
  }
}
