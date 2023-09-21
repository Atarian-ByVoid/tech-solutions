import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CreateProductReviewDTO,
  UpdateProductReviewDTO,
} from '../dto/product-review.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ProductReviewService } from './product-review.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
@ApiTags('Product Review')
@Controller('product-review')
export class ProductReviewController {
  constructor(private prodcutReviewService: ProductReviewService) {}

  @Post('rate')
  async create(
    @Body() createProductReviewDTO: CreateProductReviewDTO,
  ): Promise<CreateProductReviewDTO> {
    return this.prodcutReviewService.createReview(createProductReviewDTO);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      return await this.prodcutReviewService.findAll(page,pageSize);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.prodcutReviewService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateProductReviewDTO,
  ): Promise<UpdateProductReviewDTO> {
    return this.prodcutReviewService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.prodcutReviewService.delete(+id);
  }
}
