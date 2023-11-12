import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsNumber()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price_buy: number;

  @IsNumber()
  @IsNotEmpty()
  price_sale: number;

  @IsNumber()
  @IsOptional()
  stock: number;

  @IsNumber()
  @IsOptional()
  supplier_id: number;

  @IsNumber()
  @IsOptional()
  user_id: number;

  @IsNumber()
  @IsOptional()
  model_id: number;

  @IsString()
  @IsOptional()
  filename: string;

  @IsDateString()
  @IsOptional()
  created_at: string;

  @IsArray({ each: true })
  @IsString()
  @IsOptional()
  images?: string[];

}
