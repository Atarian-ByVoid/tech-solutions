import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBase64,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export const ColumnType = {
  DATE: 'date',
  CURRENCY: 'currency',
  NUMBER: 'number',
};

export type ColumnType = (typeof ColumnType)[keyof typeof ColumnType];

export class ColumnDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  header: string;

  @ApiPropertyOptional({ enum: ColumnType })
  @IsOptional()
  @IsEnum(ColumnType)
  type?: ColumnType;
}

export class ExportBodyDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  page: string;

  @ApiProperty({ type: ColumnDTO, isArray: true })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ColumnDTO)
  columns: ColumnDTO[];

  @ApiProperty({ type: Object, isArray: true })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Object)
  rows: object[];
}

export class ExportResponseDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsBase64()
  base64: string;
}
