import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/customer.dto';
import { CustomersService } from '../services/customers.service';


@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe)id: number) {
    return this.customersService.findOne(id);
  }

 
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)id: number,
    @Body()createCustomerDto :CreateCustomerDto,
        
  )
  {
    return this.customersService.update(id, createCustomerDto)
  }


  @Delete(':id')
    remove(@Param('id', ParseIntPipe)id: number){
    return this.customersService.remove(id);
  }

  
}
