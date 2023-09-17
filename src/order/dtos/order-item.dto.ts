import { ApiProperty } from '@nestjs/swagger';
import { ProductDTO } from 'src/product/dto/product.dto';
import { OrderDTO } from './order.dto';

export class OrderItemDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  orderId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  unitPrice: number;

  @ApiProperty({ type: ProductDTO })
  product: ProductDTO;

  @ApiProperty({ type: OrderDTO })
  order: OrderDTO;
}
