import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
    CreateDateColumn,
} from 'typeorm';
import { TicketFiles } from './ticket_files.entity';

export enum FileCondition {
    UNLINKED,
    LINKED,
    DELETED
  }

@Entity('file_paths')
export class FilePath extends BaseEntity {
    /*@PrimaryGeneratedColumn('increment')
    id: number;*/
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: false, length: 191 })
    name: string;

    @Column({ type: 'varchar', nullable: false, length: 100 })
    extension: string;

    @Column({ type: 'varchar', nullable: false, length: 255 })
    url: string;

    @Column({ type: 'smallint', nullable: false })
    size: number;

    @CreateDateColumn({ name: 'created_at', transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.toLocaleString()
    } })
    created_at: Date;

    /*@OneToOne(type => Ticket)
    ticket: Ticket*/


    @Column({ nullable: false, default: FileCondition.UNLINKED })
    condition: FileCondition;

    /*@OneToMany(
        type => TicketFiles,
        (ticket_file) => ticket_file.file_path
      )
    tickets: TicketFiles[];*/
    @OneToOne(type => TicketFiles)
    ticket_file: TicketFiles
}