import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ type: 'int4', nullable: true })
  supplier_id: number;

  @Column({type: 'int4', nullable: false})
  user_id: number;

}
