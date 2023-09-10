import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client"
import { UserDTO } from "src/user/user.dto";

export class ProductReviewDTO {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    productId: number;
  
    @ApiProperty()
    userId: number;
  
    @ApiProperty()
    rating: number;
  
    @ApiProperty()
    comment: string | null;
  
    @ApiProperty({ type: UserDTO })
    user: UserDTO;
  }