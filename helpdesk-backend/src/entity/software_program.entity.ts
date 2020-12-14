import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
} from 'typeorm';
import { Problem } from '.';
  
@Entity('software_programs')
export class SoftwareProgram extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: false, length: 191 })
    name: string;

    @Column({ type: 'varchar', nullable: false, length: 100 })
    version: string;

    @Column({ type: 'varchar', nullable: false, length: 255 })
    url: string;

    @OneToMany(
        type => Problem,
        problem => problem.software_program
    )
    problems: Problem[];
}