import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateSupplierDto } from '../dto/supplier.dto';
import { SuppliersService } from '../services/suppliers.service';


@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get()
  findAll() {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe)id: number) {
    return this.suppliersService.findOne(id);
  }

 
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)id: number,
    @Body()createSupplierDto :CreateSupplierDto,
        
  )
  {
    return this.suppliersService.update(id, createSupplierDto)
  }


  @Delete(':id')
    remove(@Param('id', ParseIntPipe)id: number){
    return this.suppliersService.remove(id);
  }

  
}
