import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product.dto';
import { ProductImage } from '../entities/product-image.entity';

@Injectable()
export class ProductsService{
    constructor(
        @InjectRepository(Product)
        private productRepo: Repository<Product>,
        
        @InjectRepository(ProductImage)
        private readonly productImageRepo: Repository<ProductImage>,

        private readonly dataSource: DataSource,
    ){}      
      
    

    async create(productDto: CreateProductDto){
        const { images = [], ...detailsProduct } = productDto;

        const product = await this.productRepo.create({
            ...detailsProduct,
            images: images.map((image) => this.productImageRepo.create({ url: image }),
            ),
        });
        await this.productRepo.save(product);
        return product;
    }

    //Encontrar un producto

    findOne(id: number){
        return this.productRepo.findOne({
            where: {id},
            relations: {
                category: true,
                supplier: true,
                user: true,
                model: true,
                images: true,
            }
        });
        
    }

    //mostrar todas los productos
    
    findAll(){
        return   this.productRepo.find({
            order: {id: 'ASC'},
            relations: {
                category: true,
                supplier: true,
                user: true, 
                model: true,
                images: true,
            },
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
        const {images, ...updateAll } = changes;
        const product = await this.productRepo.preload({
            id: id,
            ...updateAll,//Esparcir todos los datos del producto 
        });
        //correr el queryRunner

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        if(images) {
            await queryRunner.manager.delete(ProductImage, {product: { id }});
            
            //creamos nuevas imagenes
            product.images = images.map((image) =>
            this.productImageRepo.create({ url: image }),
            );
        } else {
            product.images = await this.productImageRepo.findBy({ product: { id }});
        }
        //guardamos el producto
        await queryRunner.manager.save(product);
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return product;
    }
}