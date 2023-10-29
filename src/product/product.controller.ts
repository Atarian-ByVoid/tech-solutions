import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro na solicitação' })
  async createProduct(@Body() createProductDTO: CreateProductDTO) {
    try {
      const result = await this.productService.createProduct(createProductDTO);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Recupera todos os produtos' })
  @ApiResponse({ status: 200, description: 'Produtos recuperados com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro na solicitação' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      return await this.productService.findAll(page, pageSize);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recupera um produto por ID' })
  @ApiResponse({ status: 200, description: 'Produto recuperado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.productService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui um produto por ID' })
  @ApiResponse({ status: 204, description: 'Produto excluído com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um produto por ID' })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateProductDTO: UpdateProductDTO,
  ) {
    try {
      const updatedProduct = await this.productService.updateProduct(
        +id,
        updateProductDTO,
      );
      if (!updatedProduct) {
        throw new NotFoundException(`Produto com ID ${id} não encontrado`);
      }
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }
}
