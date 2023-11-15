import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { OrderDTO } from 'src/order/dtos/order.dto';
import { ProductReviewDTO } from 'src/product/dto/product-review.dto';

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
  @IsStrongPassword()
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

  @ApiProperty({
    type: Role,
    enum: Role,
  })
  @IsEnum(Role)
  role: Role;
}

export class CreateUserDTO extends OmitType(UserDTO, [
  'reviews',
  'orders',
  'id',
  'role',
]) {}
export class UpdateUserDTO extends OmitType(UserDTO, [
  'reviews',
  'orders',
  'id',
  'role',
]) {}
