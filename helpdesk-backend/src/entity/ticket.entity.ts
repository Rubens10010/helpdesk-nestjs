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
    CANCELED,
    OPEN,
    DERIVED,
    ATTENDING,
    CLOSED,
    REOPENED
  }

export enum TicketChannel {
    WEBSITE,
    APPLICATION,
    FACEBOOK,
    GMAIL,
    MANUAL
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

    @Column({ nullable: false, default: TicketCondition.OPEN })
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

    @Column({ nullable: false, default: TicketChannel.WEBSITE })
    channel: TicketChannel;

    @Column({ type: 'boolean',  default: false })
    scaled: boolean;

    @OneToMany(
        type => Problem,
        problem => problem.software_program
    )
    problems: Problem[];
}