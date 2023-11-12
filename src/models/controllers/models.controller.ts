import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ModelsService } from "../services/models.service";
import { CreateModelDto } from "../dto/model.dto";


@Controller('models')
export class ModelsController
{
    constructor(private readonly modelsService:ModelsService){}
    @Post()
    async CreateModel(@Body() createModelDto: CreateModelDto){
        return this.modelsService.create(createModelDto);
    }

    
    @Get()
    findAll(){
        return this.modelsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe)id: number){
        return this.modelsService.findOne(id);
    }
    @Delete(':id')
    remove(@Param('id', ParseIntPipe)id: number){
        return this.modelsService.remove(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)id: number,
        @Body()createModelDto :CreateModelDto,
        
    )
    {
        return this.modelsService.update(id, createModelDto)
    }
}