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
import { CreateOrderDTO, UpdateOrderDTO } from './dtos/order.dto';
import { OrderService } from './order.service';

@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro na solicitação' })
  async createProduct(@Body() createOrderDTO: CreateOrderDTO) {
    try {
      const result = await this.orderService.createOrder(createOrderDTO);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Recupera todos os pedidos' })
  @ApiResponse({ status: 200, description: 'Pedidos recuperados com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro na solicitação' })
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
  @ApiOperation({ summary: 'Recupera um pedido por ID' })
  @ApiResponse({ status: 200, description: 'Pedido recuperado com sucesso' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.orderService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui um pedido por ID' })
  @ApiResponse({ status: 204, description: 'Pedido excluído com sucesso' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  async deleteOrder(@Param('id') id: string) {
    return await this.orderService.deleteOrder(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um pedido por ID' })
  @ApiResponse({ status: 200, description: 'Pedido atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDTO: UpdateOrderDTO,
  ) {
    try {
      const updateOrder = await this.orderService.updateOrder(
        +id,
        updateOrderDTO,
      );
      if (!updateOrder) {
        throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
      }
      return updateOrder;
    } catch (error) {
      throw error;
    }
  }
}
