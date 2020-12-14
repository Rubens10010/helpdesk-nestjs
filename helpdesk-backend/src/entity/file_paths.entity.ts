import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    OneToOne,
    CreateDateColumn,
} from 'typeorm';
import { Problem } from '.';
import { Ticket } from './ticket.entity';
  
@Entity('file_paths')
export class FilePath extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: false, length: 191 })
    name: string;

    @Column({ type: 'varchar', nullable: false, length: 100 })
    extension: string;

    @Column({ type: 'varchar', nullable: false, length: 255 })
    url: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @OneToOne(type => Ticket)
    ticket: Ticket
}