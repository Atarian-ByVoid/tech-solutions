import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { UserDTO } from 'src/user/user.dto';
import { OrderItemDTO } from './order-item.dto';
import { Status } from '@prisma/client';

export class OrderDTO {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    type: Status,
    enum: Status,
  })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ type: [OrderItemDTO] })
  orderItems: OrderItemDTO[];

  @ApiProperty({ type: UserDTO })
  user: UserDTO;
}

export class CreateOrderDTO extends OmitType(OrderDTO, [
  'user',
  'orderItems',
]) {}

export class UpdateOrderDTO extends OmitType(OrderDTO, [
  'user',
  'orderItems',
]) {}
