import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
  } from 'typeorm';
import { Colaborator } from './colaborator.entity';
import { Movement } from './movement.entity';
import { Problem } from './problem.entity';
  //import { Exclude } from 'class-transformer';
  
  export enum TechnicalAreaStatus {
    DELETED,
    CREATED
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
  
    @Column({ nullable: false, default: TechnicalAreaStatus.CREATED })
    status: TechnicalAreaStatus;

    // 1:n relation with colaborators
    @OneToMany(type => Colaborator, colaborator => colaborator.technical_area)
    colaborators: Colaborator[];

    @OneToMany(
      type => Movement,
      movement => movement.colaborator
    )
    movements: Movement[];

    @OneToMany(
      type => Problem,
      problem => problem.technical_area
    )
    problems: Problem[];
  }
  