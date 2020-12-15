import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
import { TechnicalArea, SoftwareProgram } from './index';

@Entity('problems')
export class Problem extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: false, length: 191, unique: true })
    title: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @ManyToOne(
      type => TechnicalArea, technicalArea => technicalArea.problems, 
      { nullable: false })
    @JoinColumn({ name: 'technical_area_id' })
    technical_area: TechnicalArea

    @ManyToOne(
        type => SoftwareProgram,
        softwareProgram => softwareProgram.problems
      )
    @JoinColumn({ name: 'software_program_id' })
    software_program: SoftwareProgram
}