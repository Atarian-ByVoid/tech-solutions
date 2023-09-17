import { ApiProperty, ApiPropertyOptional, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsEmail, IsInt, IsNotEmpty } from "class-validator";
import { OrderDTO } from "src/order/dtos/order.dto";
import { ProductReviewDTO } from "src/product/dto/product-review.dto";

export class UserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id: number;
  
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

  @ApiPropertyOptional({ type: [OrderDTO] })
  orders: OrderDTO[];

  @ApiPropertyOptional({ type: [ProductReviewDTO] })
  reviews: ProductReviewDTO[];
}


export class CreateUserDTO extends OmitType(UserDTO,['reviews','orders','id']){}
export class UpdateUserDTO extends OmitType(UserDTO,['reviews','orders','id']){}

