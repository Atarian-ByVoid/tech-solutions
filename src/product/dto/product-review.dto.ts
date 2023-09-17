import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserDTO } from 'src/user/user.dto';
import { ProductDTO } from './product.dto';
import { IsInt, IsString, Max, Min } from 'class-validator';

export class ProductReviewDTO {
  @IsInt()
  @ApiProperty()
  productId: number;

  @IsInt()
  @ApiProperty()
  userId: number;

  @Min(1)
  @Max(5)
  @ApiProperty()
  rating: number;

  @IsString()
  @ApiProperty()
  comment: string | null;

  @ApiProperty({ type: UserDTO })
  user: UserDTO;

  @ApiProperty({ type: ProductDTO })
  product: ProductDTO;
}

export class CreateProductReviewDTO extends OmitType(ProductReviewDTO, [
  'user',
  'product',
]) {}

export class UpdateProductReviewDTO extends CreateProductReviewDTO {}
