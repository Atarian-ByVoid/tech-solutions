import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import { UpdateUserDTO } from 'src/user/user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProduct(@Body() createProductDTO: CreateProductDTO) {
    try {
      const result = await this.productService.createProduct(createProductDTO);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.productService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.productService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(+id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateProductDTO: UpdateProductDTO,
  ) {
    try {
      const updatedUser = await this.productService.updateProduct(
        +id,
        updateProductDTO,
      );
      if (!updatedUser) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}
