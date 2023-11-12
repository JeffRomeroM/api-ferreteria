
import { Category } from 'src/categories/entities/category.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImage } from './product-image.entity';
import { Model } from 'src/models/entities/model.entity';
@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id?: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  description: string;

  @Column({ type: 'int4', nullable: false })
  price_buy: number;

  @Column({ type: 'int4', nullable: false })
  price_sale: number;

  @Column({ type: 'int8', nullable: false })
  stock: number;

  @Column({ type: 'varchar',  nullable: true })
  filename: string;

  @CreateDateColumn({ type: 'timestamp', default: ()=>'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'int4', nullable: false })
  category_id: number;

  @Column({ type: 'int4', nullable: false })
  model_id: number;

  @Column({ type: 'int4', nullable: true })
  supplier_id: number;

  @Column({type: 'int4', nullable: false})
  user_id: number;

  @ManyToOne(() => Category)
  @JoinColumn({ 
    name: 'category_id',
    referencedColumnName: 'id'
   })
  category: Category;


  @ManyToOne(() => Supplier)
  @JoinColumn({ 
    name: 'supplier_id',
    referencedColumnName: 'id'
   })
  supplier: Supplier;

  @ManyToOne(() => User)
  @JoinColumn({ 
    name: 'user_id',
    referencedColumnName: 'id'
   })
  user: User;


  @ManyToOne(() => Model)
  @JoinColumn({ 
    name: 'model_id',
    referencedColumnName: 'id'
   })
  model: Model;

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
  })
  images?: ProductImage[];
  
}
