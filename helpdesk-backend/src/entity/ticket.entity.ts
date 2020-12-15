import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Problem } from '.';
import { FilePath } from './file_paths.entity';

export enum TicketCondition {
    Canceled = 0,
    Open = 1,
    Derived = 2,
    Attending = 3,
    Closed = 4,
    Reopened = 5
  }

export enum TicketChannel {
    Website = 0,
    Application = 1,
    Facebook = 2,
    Gmail = 3,
    Manual = 4
}

@Entity('tickets')
export class Ticket extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'integer', nullable: false })
    code: number;

    @Column({ type: 'smallint',  nullable: false })
    year: number;

    @Column({ type: 'text', nullable: false })
    problem_description: string;

    @Column({ nullable: false, default: TicketCondition.Open })
    status: TicketCondition;

    @OneToOne(type => FilePath, photo_1 => photo_1.ticket, {nullable: true})
    @JoinColumn({ name: 'photo_1_id'})
    photo_1: FilePath

    @OneToOne(type => FilePath, photo_2 => photo_2.ticket, {nullable: true})
    @JoinColumn({ name: 'photo_2_id' })
    photo_2: FilePath

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    @Column({ type: "timestamp without time zone", nullable: true })
    closed_at: Date;

    @Column({ type: "timestamp without time zone", nullable: true })
    reopened_at: Date;

    @Column({ type: 'smallint',  nullable: false })
    satisfaction: number;

    @Column({ nullable: false, default: TicketChannel.Website })
    channel: TicketChannel;

    @Column({ type: 'boolean',  default: false })
    scaled: boolean;

    @OneToMany(
        type => Problem,
        problem => problem.software_program
    )
    problems: Problem[];
}