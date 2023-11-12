import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModelDto } from '../dto/model.dto';
import { Model } from '../entities/model.entity';

@Injectable()
export class ModelsService{
    constructor(
        @InjectRepository(Model)
        private modelRepo: Repository<Model>
    ){}

    async create(createModelDto:CreateModelDto){
        const model = this.modelRepo.create(createModelDto);
        await  this.modelRepo.save(model);
        return model;
    }

    //mostrar un modelo mediante el id y mostrar los datos de marca y usuario
    findOne(id: number){
         return this.modelRepo.findOne({
             where: {id},
             relations: {
                brand: true,
             }
        
         });
    }
    
    //mostrar todas los modelos
    findAll(){
        return   this.modelRepo.find({
            order: {id: 'ASC'},
        });
    }

    //eliminar un modelo
    async remove(id:number){
        const model =await this.findOne(id);
        await this.modelRepo.remove(model);
        return 'Modelo eliminado';
    }

    //actualizar un modelo
    async update(id: number, changes: CreateModelDto){
        const oldModel = await this.findOne(id);
        const updateModel = await this.modelRepo.merge(oldModel, changes);
        return this.modelRepo.save(updateModel);
    }
}