import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
  } from 'typeorm';
import { Colaborator } from './colaborator.entity';
  //import { Exclude } from 'class-transformer';
  
  export enum TechnicalAreaStatus {
    Deleted = 0,
    Created = 1,
  }
  
  @Entity('technical_areas')
  export class TechnicalArea extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'varchar', nullable: false, length: 191 })
    name: string;

    @Column({ type: 'varchar', nullable: false, length: 191 })
    email: string;
  
    @Column({ nullable: true, length: 40, unique: true })
    phone: string;
  
    @Column({ nullable: false, default: TechnicalAreaStatus.Created })
    status: TechnicalAreaStatus;

    // 1:n relation with colaborators
    @OneToMany(type => Colaborator, colaborator => colaborator.technical_area)
    colaborators: Colaborator[];
  }
  