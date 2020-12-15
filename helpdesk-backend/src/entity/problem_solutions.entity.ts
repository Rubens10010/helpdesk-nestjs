import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    ManyToOne,
    CreateDateColumn,
    OneToOne,
    OneToMany,
  } from 'typeorm';
import { Attention } from './attention.entity';
import { Solution, Problem } from './index';

@Entity('problem_solutions')
export class ProblemSolutions extends BaseEntity {
    @ManyToOne(() => Problem, (problem) => problem.id, {
        primary: true,
        nullable: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: 'problem_id'})
    problem!: Problem;

    @ManyToOne(() => Solution, (solution) => solution.id, {
        primary: true,
        nullable: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: 'solution_id'})
    solution!: Solution;

    @Column({ type: 'boolean', default: false })
    prefered: boolean;

    @Column({ type: 'integer', default: 0 })
    rank: number;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @OneToMany(
        type => Attention,
        attention => attention.problem_solution
    )
    attentions: Attention[];
}