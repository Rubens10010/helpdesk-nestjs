import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { Attention } from './attention.entity';
import { Colaborator } from './colaborator.entity';
import { TechnicalArea } from './technical_area.entity';

export enum MovementCondition {
    Created = 0,
    Distributed = 1,
    Accepted = 2,
    Derived = 3,
    Attended = 4
}

@Entity('movements')
export class Movement extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(type => Movement)
    @JoinColumn({ name: 'last_id' })
    last_id: Movement

    @OneToOne(type => Movement)
    child: Movement

    @ManyToOne(
        type => TechnicalArea,
        technical_area => technical_area.movements,
        { nullable: false }
      )
    @JoinColumn({ name: 'technical_area_id' })
    technical_area: TechnicalArea

    @Column({ type: 'smallint', nullable: false, default: 0 })
    priority: number;

    @Column({ nullable: false, default: MovementCondition.Created })
    status: MovementCondition;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    @Column({ type: "timestamp without time zone", nullable: true })
    accepted_at: Date;

    @Column({ type: 'boolean', default: false })
    notified: boolean;

    @Column({ type: 'boolean', default: true })
    latest: boolean;

    @ManyToOne(
        type => Colaborator,
        colaborator => colaborator.movements
      )
    @JoinColumn({ name: 'colaborator_id' })
    colaborator: Colaborator

    @OneToOne(type => Attention)
    attention: Attention
}