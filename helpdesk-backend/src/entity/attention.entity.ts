import {
    Entity,
    Column,
    BaseEntity,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Movement } from './movement.entity';
import { ProblemSolutions } from './problem_solutions.entity';
import { Reply } from './reply.entity';
  
@Entity('attentions')
export class Attention extends BaseEntity {
    @OneToOne(() => Movement, (movement) => movement.id, {
        primary: true,
        nullable: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: 'movement_id'})
    movement!: Movement;

    @Column({ type: 'varchar', nullable: false, length: 191 })
    code: string;

    @Column({ type: 'varchar', nullable: false, length: 255 })
    subject: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    @Column({ type: "timestamp without time zone", nullable: true })
    finished_at: Date;
  
    @Column({ type: 'boolean', default: false})
    replied: boolean;

    @Column({ type: 'smallint', nullable: true})
    satisfaction: number;

    @Column({ type: 'smallint', nullable: true})
    reopen_attention: number;

    @ManyToOne(
        type => ProblemSolutions,
        problem_solution => problem_solution.attentions
      )
    @JoinColumn({ name: 'problem_solution_id' })
    problem_solution: ProblemSolutions

    @OneToMany(
        type => Reply,
        reply => reply.attention
    )
    replies: Reply[];
}