import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(createProductDTO: CreateProductDTO) {
    const { ...rest } = createProductDTO;

    const createProductInput = {
      ...rest,
    };

    try {
      const user = await this.prisma.product.create({
        data: createProductInput,
      });
      console.log(createProductDTO);

      return {
        statusCode: 200,
        data: user,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao cadastrar o produto: ' + error.message,
      );
    }
  }

  async findAll() {
    const dataTasks = await this.prisma.product.findMany({});
    return {
      statusCode: 200,
      data: dataTasks,
    };
  }

  async findOne(id: number) {
    const dataTask = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });
    return {
      statusCode: 200,
      data: dataTask,
    };
  }
  async deleteProduct(id: number): Promise<void> {
    const dataTask = await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }

  async updateProduct(
    id: number,
    updateProductDTO: UpdateProductDTO,
  ): Promise<UpdateProductDTO> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const updatedUserData: { [key: string]: any } = {};

    if (updateProductDTO.name) {
      updatedUserData.name = updateProductDTO.name;
    }
    if (updateProductDTO.description) {
      updatedUserData.description = updateProductDTO.description;
    }

    if (updateProductDTO.price) {
      updatedUserData.price = updateProductDTO.price;
    }
    if (updateProductDTO.stock) {
      updatedUserData.stock = updateProductDTO.stock;
    }

    const updatedUser = await this.prisma.product.update({
      where: { id },
      data: updatedUserData,
    });

    return {
      ...updatedUser,
    };
  }
}
