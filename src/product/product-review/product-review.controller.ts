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
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import {
  CreateProductReviewDTO,
  UpdateProductReviewDTO,
} from '../dto/product-review.dto';
import { ProductReviewService } from './product-review.service';

@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
@ApiTags('Product Review')
@Controller('product-review')
export class ProductReviewController {
  constructor(private productReviewService: ProductReviewService) {}

  @Post('rate')
  @ApiOperation({ summary: 'Avalia um produto' })
  @ApiResponse({ status: 201, description: 'Avaliação criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro na solicitação' })
  async create(
    @Body() createProductReviewDTO: CreateProductReviewDTO,
  ): Promise<CreateProductReviewDTO> {
    return this.productReviewService.createReview(createProductReviewDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Recupera todas as avaliações de produtos' })
  @ApiResponse({
    status: 200,
    description: 'Avaliações de produtos recuperadas com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro na solicitação' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      return await this.productReviewService.findAll(page, pageSize);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recupera uma avaliação de produto por ID' })
  @ApiResponse({
    status: 200,
    description: 'Avaliação de produto recuperada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Avaliação de produto não encontrada',
  })
  async findOne(@Param('id') id: string) {
    try {
      return await this.productReviewService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma avaliação de produto por ID' })
  @ApiResponse({
    status: 200,
    description: 'Avaliação de produto atualizada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Avaliação de produto não encontrada',
  })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateProductReviewDTO,
  ): Promise<UpdateProductReviewDTO> {
    return this.productReviewService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui uma avaliação de produto por ID' })
  @ApiResponse({
    status: 204,
    description: 'Avaliação de produto excluída com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Avaliação de produto não encontrada',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.productReviewService.delete(+id);
  }
}
