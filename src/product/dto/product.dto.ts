import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { OrderItemDTO } from 'src/order-item/dto/order-item.dto';

export class ProductDTO {
  @ApiProperty()
  @IsString()
  price: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  stock: number;

  @ApiPropertyOptional({ type: [OrderItemDTO] })
  orderItems: OrderItemDTO[];
}

export class CreateProductDTO extends OmitType(ProductDTO, ['orderItems']) {}
export class UpdateProductDTO extends OmitType(ProductDTO, ['orderItems']) {}
