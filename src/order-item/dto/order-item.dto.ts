import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ProductDTO } from 'src/product/dto/product.dto';
import { OrderDTO } from '../../order/dtos/order.dto';
import { Decimal } from '@prisma/client/runtime/library';
import { IsDecimal, IsNumber, IsString } from 'class-validator';

export class OrderItemDTO {

  @ApiProperty()
  @IsNumber()
  orderId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  @IsString()
  unitPrice: string;

  @ApiProperty({ type: ProductDTO })
  product: ProductDTO;

  @ApiProperty({ type: OrderDTO })
  order: OrderDTO;
}

export class CreateOrderItemDTO extends OmitType(OrderItemDTO,['order','product']){}
export class UpdateOrderItemDTO extends OmitType(OrderItemDTO,['order','product']){}

