import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../entities/supplier.entity';
import { CreateSupplierDto } from '../dto/supplier.dto';

@Injectable()
export class SuppliersService{
    constructor(
        @InjectRepository(Supplier)
        private supplierRepo: Repository<Supplier>
    ){}

    async create(createSupplierDto:CreateSupplierDto){
        const supplier = this.supplierRepo.create(createSupplierDto);
        await  this.supplierRepo.save(supplier);
        return supplier;
    }

    //Encontrar un proveedor

    findOne(id: number){
        return this.supplierRepo.findOneBy({id})
    }

    //mostrar todos los proveedores
    findAll(){
        return   this.supplierRepo.find({
            order: {id: 'ASC'},
        });
    }

    //eliminar un proveedor
    async remove(id:number){
        const product =await this.findOne(id);
        await this.supplierRepo.remove(product);

        return 'Proveedor eliminado';
    }

    
    //actualizar una producto
    async update(id: number, changes: CreateSupplierDto){
        const oldSupplier = await this.findOne(id);
        const updateSupplier = await this.supplierRepo.merge(oldSupplier, changes);
        return this.supplierRepo.save(updateSupplier);
    }
}