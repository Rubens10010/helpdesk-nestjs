import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { FilePath } from './file_paths.entity';
import { Ticket } from './ticket.entity';
  
@Entity('ticket_files')
export class TicketFiles extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: "timestamp without time zone", nullable: true })
    revised_at: Date;

    @ManyToOne(
        type => Ticket,
        ticket => ticket.files_attached,
        { nullable: false }
      )
    @JoinColumn({ name: 'ticket_id' })
    ticket: Ticket
    
    /*@ManyToOne(
        type => FilePath,
        file_path => file_path.tickets,
        { nullable: false }
      )
    @JoinColumn({ name: 'file_path_id' })
    file_path: FilePath*/
    @OneToOne(
        type => FilePath,
        (file_path) => file_path.ticket_file,
        { nullable: false}
      )
    @JoinColumn({ name: 'file_path_id' })
    file_path: FilePath
}