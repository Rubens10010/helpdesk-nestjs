import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
//import { Exclude } from 'class-transformer';

export enum UserStatus {
  Deleted = 0,
  Created = 1,
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
  google_id: string;

  @Column({ nullable: true, length: 191 })
  //@Exclude() 
  refresh_token?: string;

  @Column({ nullable: true, length: 100 })
  photo_url: string;

  @Column({ nullable: false, default: UserStatus.Created })
  status: UserStatus;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
