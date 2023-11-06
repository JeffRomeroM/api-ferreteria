import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto} from '../dto/brand.dto';


@Injectable()
export class BrandsService{
    constructor(
        @InjectRepository(Brand)
        private brandRepo: Repository<Brand>
    ){}

    async create(createBrandDto:CreateBrandDto){
        const brand = this.brandRepo.create(createBrandDto);
        await  this.brandRepo.save(brand);
        return brand;
    }

    //Encontrar una marca
    findOne(id: number){
        return this.brandRepo.findOneBy({id})
    }
    
    //mostrar todas las marcas
    findAll(){
        return   this.brandRepo.find({
            order: {id: 'ASC'},
        });
    }

    //eliminar una marca
    async remove(id:number){
        const brand =await this.findOne(id);
        await this.brandRepo.remove(brand);
        return 'Marca eliminada';
    }

    //actualizar una marca
    async update(id: number, changes: CreateBrandDto){
        const oldBrand = await this.findOne(id);
        const updateBrand = await this.brandRepo.merge(oldBrand, changes);
        return this.brandRepo.save(updateBrand);
    }
}