import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateCategoryDto } from "../dto/category.dto";
import { CategoriesService } from "../services/categories.service";

@Controller('categories')
export class CategoriesController {

  constructor(private readonly categoryServices: CategoriesService) {}


  @Post()
  async create(@Body() categoryDto: CreateCategoryDto) {
    return await this.categoryServices.create(categoryDto);
  }

  @Get()
  findAll() {
    return this.categoryServices.findAll();

  }

  @Get(':id')
  finOne(@Param('id', ParseIntPipe) id: number){
    return this.categoryServices.findOne(id);

  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryServices.remove(id);
  }


  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryServices.update(id, createCategoryDto);
  }
  
}
