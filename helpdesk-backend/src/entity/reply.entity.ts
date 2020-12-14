import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Attention } from './attention.entity';

export enum ReplyCondition {
    Deleted = 0,
    Created = 1,
    Read = 2,
    Responded = 3,
    Last = 4
}

export enum ReplySource {
    Support = 1,
    Attendee = 2,
}
  
@Entity('replies')
export class Reply extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(
        type => Attention,
        attention => attention.replies
      )
    @JoinColumn({ name: 'attention_id' })
    attention: Attention

    @Column({ type: 'varchar', nullable: false, length: 100 })
    title: string;

    @Column({ type: 'text', nullable: false })
    message: string;

    @Column({ nullable: false, default: ReplySource.Attendee })
    source: ReplySource;

    @Column({ nullable: false, default: ReplyCondition.Created })
    status: ReplyCondition;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}