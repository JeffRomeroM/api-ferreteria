import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product.dto';

@Injectable()
export class ProductsService{
    constructor(
        @InjectRepository(Product)
        private productRepo: Repository<Product>
    ){}

    async create(createProductDto:CreateProductDto){
        const product = this.productRepo.create(createProductDto);
        await  this.productRepo.save(product);
        return product;
    }

    //Encontrar un producto

    findOne(id: number){
        return this.productRepo.findOneBy({id})
    }

    //mostrar todas los productos
    findAll(){
        return   this.productRepo.find({
            order: {id: 'ASC'},
        });
    }

    //eliminar un producto
    async remove(id:number){
        const product =await this.findOne(id);
        await this.productRepo.remove(product);
        return 'Producto eliminado';
    }

    
    //actualizar una producto
    async update(id: number, changes: CreateProductDto){
        const oldProduct = await this.findOne(id);
        const updateProduct = await this.productRepo.merge(oldProduct, changes);
        return this.productRepo.save(updateProduct);
    }
}