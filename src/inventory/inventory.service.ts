import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDTO } from 'src/product/dto/product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Workbook } from 'exceljs';

@Injectable()
export class InventoryService {
  constructor(private prismaService: PrismaService) {}

  async parse(file: Express.Multer.File) {
    if (
      file.mimetype !==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      throw new BadRequestException('só é possível importar por xlsx');
    }

    const workbook = new Workbook();
    await workbook.xlsx.load(file.buffer);

    const arr: Object[] = [];
    workbook.worksheets[0].columns.forEach((column) => {
      let key: string;
      column.values.forEach((value, index) => {
        if (index === 1) {
          key = String(value);
          return;
        }

        const row = index - 2;
        if (!arr[row]) {
          arr[row] = {};
        }

        arr[row][key] = value;
      });
      return arr;
    });

    const productPromises = arr.map(async (value: any) => {
      const createProductDTO = new CreateProductDTO();
      createProductDTO.price = value.price;
      createProductDTO.name = value.name;
      createProductDTO.description = value.description;
      createProductDTO.stock = value.stock;

      return createProductDTO;
    });

    const resolvedProducts = await Promise.all(productPromises);

    await this.prismaService.product.createMany({
      data: resolvedProducts,
    });
  }
}
