import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";
import { OrderDTO } from "src/order/dtos/order.dto";
import { ProductReviewDTO } from "src/product/dto/product-review.dto";

export class UserDTO {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  address: string;


  @ApiProperty({ type: [OrderDTO] })
  orders: OrderDTO[];

  @ApiProperty({ type: [ProductReviewDTO] })
  reviews: ProductReviewDTO[];
}
