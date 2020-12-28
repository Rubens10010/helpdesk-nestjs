import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    JoinColumn,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
import { Colaborator, ProblemSolutions } from '.';

@Entity('solutions')
export class Solution extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'text', nullable: false })
    content: string;

    @Column({ type: 'varchar', nullable: true, length: 100 })
    short: string;

    @Column({ type: 'varchar', nullable: true, length: 191 })
    help_url: string;

    @ManyToOne(
        type => Colaborator,
        colaborator => colaborator.solutions,
        { nullable: false }
      )
    @JoinColumn({ name: 'colaborator_id' })
    colaborator: Colaborator

    @OneToMany(
      type => ProblemSolutions,
      problem_solutions => problem_solutions.solution
    )
    problems: ProblemSolutions[];
}