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
    OneToMany,
  } from 'typeorm';
import { Movement } from './movement.entity';
import { TechnicalArea } from './technical_area.entity';
import { User } from './user.entity';
  
  export enum ColaboratorStatus {
    DELETED,
    CREATED
  }
  
  @Entity('colaborators')
  export class Colaborator extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(type => User)
    @JoinColumn({ name: 'user_id' })
    profile: User

    @Column({ type: 'varchar', nullable: false, length: 191 })
    nickname: string;
  
    @Column({ nullable: false, default: true })
    available: boolean;

    @Column({ nullable: false, default: false })
    lead: boolean;
  
    @Column({ nullable: false, default: ColaboratorStatus.CREATED })
    status: ColaboratorStatus;
  
    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    // n:1 relation with technical areas
    @ManyToOne(
      type => TechnicalArea,
      technicalArea => technicalArea.colaborators
    )
    @JoinColumn({ name: 'technical_area_id' })
    technical_area: TechnicalArea

    @OneToMany(
      type => Movement,
      movement => movement.colaborator
    )
    movements: Movement[];
  }
  