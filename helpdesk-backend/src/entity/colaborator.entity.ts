import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    JoinColumn,
    OneToOne,
    ManyToOne,
  } from 'typeorm';
import { TechnicalArea } from './technical_area.entity';
import { User } from './user.entity';
  //import { Exclude } from 'class-transformer';
  
  export enum ColaboratorStatus {
    Deleted = 0,
    Created = 1,
  }
  
  @Entity('colaborators')
  export class Colaborator extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(type => User)
    @JoinColumn({ name: 'user_id' })
    profile: User

    @ManyToOne(type => TechnicalArea)
    @JoinColumn({ name: 'technical_area_id' })
    technical_area: TechnicalArea
  
    @Column({ type: 'varchar', nullable: false, length: 191 })
    nickname: string;
  
    @Column({ nullable: false, default: true })
    available: boolean;

    @Column({ nullable: false, default: false })
    lead: boolean;
  
    @Column({ nullable: false, default: ColaboratorStatus.Created })
    status: ColaboratorStatus;
  
    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
  }
  