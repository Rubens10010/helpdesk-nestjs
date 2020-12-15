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
    DELETED,
    CREATED,
    READ,
    RESPONDED,
    LAST
}

export enum ReplySource {
    SUPPORT,
    ATTENDEE,
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

    @Column({ nullable: false, default: ReplySource.ATTENDEE })
    source: ReplySource;

    @Column({ nullable: false, default: ReplyCondition.CREATED })
    status: ReplyCondition;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}