import { Movement } from './index';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Problem, User } from '.';
import { FilePath } from './file_paths.entity';
import { TicketFiles } from './ticket_files.entity';

/***************** IMPORTANT **************************************
/   CREATE SEQUENCE IN POSTGRES FOR TICKET NUMBERING
/   > CREATE SEQUENCE ticket_number_generator START 1000000;
/   > SELECT last_value FROM ticket_number_generator;
/   > SELECT nextval('ticket_number_generator');
/   > ALTER SEQUENCE ticket_number_generator RESTART WITH 1000000;
/*****************************************************************/

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

    @ManyToOne(
      type => Problem,
      problem => problem.tickets,
      { nullable: false }
    )
    @JoinColumn({ name: 'problem_id' })
    problem: Problem

    @ManyToOne(
        type => User,
        user => user.tickets,
        { nullable: false }
      )
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column({ type: 'text', nullable: false })
    problem_description: string;

    @Column({ nullable: false, default: TicketCondition.OPEN })
    condition: TicketCondition;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    @Column({ type: "timestamp without time zone", nullable: true })
    closed_at: Date;

    @Column({ type: "timestamp without time zone", nullable: true })
    reopened_at: Date;

    @Column({ type: 'smallint',  nullable: true })
    satisfaction: number;

    @Column({ nullable: false, default: TicketChannel.WEBSITE })
    channel: TicketChannel;

    @Column({ type: 'boolean',  default: false })
    scaled: boolean;

    @OneToMany(
      type => Movement,
      (movement) => movement.ticket
    )
    movements: Movement[];

    @OneToMany(
      type => TicketFiles,
      (ticket_file) => ticket_file.ticket
    )
    files_attached: TicketFiles[];
}