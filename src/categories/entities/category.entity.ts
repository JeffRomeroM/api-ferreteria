import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category {

  @PrimaryGeneratedColumn({ type: 'int4' })
  id?: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

 
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at:Date;
  
 
  
}