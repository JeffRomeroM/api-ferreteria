import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsServices: ProductsService) {}

  @Post()
  async create(@Body() productDto: CreateProductDto) {
    return await this.productsServices.create(productDto);
  }

  @Get()
  findAll() {
    return this.productsServices.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsServices.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsServices.remove(id);
  }

  
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsServices.update(id, createProductDto);
  }
}
