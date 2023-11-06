import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateBrandDto } from "../dto/brand.dto";
import { BrandsService } from "../services/brands.service";


@Controller('brands')
export class BrandController
{
    constructor(private readonly brandsService:BrandsService){}
    
    @Post()
    async CreateBrand(@Body() createBrandDto: CreateBrandDto){
        return this.brandsService.create(createBrandDto);
    }

    
    @Get()
    findAll(){
        return this.brandsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe)id: number){
        return this.brandsService.findOne(id);
    }
    @Delete(':id')
    remove(@Param('id', ParseIntPipe)id: number){
        return this.brandsService.remove(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)id: number,
        @Body()createBrandDto :CreateBrandDto,
        
    )
    {
        return this.brandsService.update(id, createBrandDto)
    }
}