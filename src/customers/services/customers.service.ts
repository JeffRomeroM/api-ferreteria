import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto } from '../dto/customer.dto';

@Injectable()
export class CustomersService{
    constructor(
        @InjectRepository(Customer)
        private customerRepo: Repository<Customer>
    ){}

    async create(createCustomerDto:CreateCustomerDto){
        const customer = this.customerRepo.create(createCustomerDto);
        await  this.customerRepo.save(customer);
        return customer;
    }

    //Encontrar un cliente

    findOne(id: number){
        return this.customerRepo.findOneBy({id})
    }

    

    //mostrar todos los clientes
    findAll(){
        return   this.customerRepo.find({
            order: {id: 'ASC'},
        });
    }

    //eliminar un cliente
    async remove(id:number){
        const product =await this.findOne(id);
        await this.customerRepo.remove(product);

        return 'Cliente eliminado';
    }

    
    //actualizar un cliente
    async update(id: number, changes: CreateCustomerDto){
        const oldCustomer = await this.findOne(id);
        const updateCustomer = await this.customerRepo.merge(oldCustomer, changes);
        return this.customerRepo.save(updateCustomer);
    }
}