import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { UserDTO } from 'src/user/user.dto';
import { OrderItemDTO } from './order-item.dto';

export class OrderDTO {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty({ type: [OrderItemDTO] })
  orderItems: OrderItemDTO[];

  @ApiProperty({ type: UserDTO })
  user: UserDTO;
}
