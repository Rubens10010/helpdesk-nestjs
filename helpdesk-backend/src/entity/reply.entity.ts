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
        attention => attention.replies,
        { nullable: false }
      )
    @JoinColumn({ name: 'attention_id' })
    attention: Attention

    @Column({ type: 'text', nullable: false })
    message: string;

    @Column({ nullable: false, default: ReplySource.ATTENDEE })
    source: ReplySource;

    @Column({ nullable: false, default: ReplyCondition.CREATED })
    condition: ReplyCondition;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}