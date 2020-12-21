import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    JoinColumn,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
import { ProblemSolutions } from '.';
import { User } from './user.entity';

@Entity('solutions')
export class Solution extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'text', nullable: false })
    content: string;

    @Column({ type: 'varchar', nullable: false, length: 100 })
    short: string;

    @Column({ type: 'varchar', nullable: true, length: 191 })
    help_url: string;

    @ManyToOne(
        type => User,
        proposer => proposer.solutions
      )
    @JoinColumn({ name: 'user_id' })
    proposer: User

    @OneToMany(
      type => ProblemSolutions,
      problem_solutions => problem_solutions.solution
    )
    problems: ProblemSolutions[];
}