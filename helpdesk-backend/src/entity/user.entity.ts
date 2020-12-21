import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Colaborator } from './colaborator.entity';
import { Solution } from './solution.entity';
import { Ticket } from './ticket.entity';

export enum UserStatus {
  DELETED,
  CREATED,
}

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 191 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 191, unique: true })
  email: string;

  @Column({ nullable: true, length: 40, unique: true })
  @Exclude() 
  google_id: string;

  @Column({ nullable: true, length: 191 })
  @Exclude() 
  refresh_token?: string;

  @Column({ nullable: true, length: 100 })
  photo_url: string;

  @Column({ nullable: false, default: UserStatus.CREATED })
  status: UserStatus;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @OneToOne(type => Colaborator)
  colaborator: Colaborator

  @OneToMany(
    type => Solution,
    solution => solution.proposer
  )
  solutions: Solution[];

  @OneToMany(
    type => Ticket,
    ticket => ticket.user
  )
  tickets: Ticket[];
}
