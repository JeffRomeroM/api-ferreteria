import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Brand} from './brand.entity';

@Entity()
export class Model {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id?: number;

  @PrimaryGeneratedColumn({ type: 'int4' })
  brand_id?: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  name: string;


  // //relaciones
  @ManyToOne(()=> Brand)
  @JoinColumn({
   name: 'brand_id', //el campo que relaciona a la tabla marca
   referencedColumnName: 'id' //este es el id de la marca

  })
  brand: Brand;
}
