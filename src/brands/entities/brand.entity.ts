import { Model } from 'src/models/entities/model.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id?: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  name: string;

  @OneToMany(() => Model, (model) => model.brand)
  models: Model[];
}
