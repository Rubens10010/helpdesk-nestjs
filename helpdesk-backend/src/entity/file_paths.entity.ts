import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { Ticket } from './ticket.entity';
import { TicketFiles } from './ticket_files.entity';
  
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

    /*@OneToOne(type => Ticket)
    ticket: Ticket*/

    @Column({type: 'boolean', default: true})
    status: boolean;

    /*@OneToMany(
        type => TicketFiles,
        (ticket_file) => ticket_file.file_path
      )
    tickets: TicketFiles[];*/
    @OneToOne(type => TicketFiles)
    ticket_file: TicketFiles
}