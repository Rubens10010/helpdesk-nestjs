import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoftwareProgram } from 'src/entity';
import { CreateSoftwareProgramDto } from './dto/create-software-program.dto';
import { UpdateSoftwareProgramDto } from './dto/update-software-program.dto';
import {SoftwareProgramsRepository} from './software-programs.repository'

@Injectable()
export class SoftwareProgramsService {
  constructor(
    @InjectRepository(SoftwareProgram) 
    private softwareProgramsRepository: SoftwareProgramsRepository,
  ) {}

  async create(createSoftwareProgramDto: CreateSoftwareProgramDto) {
    const program = new SoftwareProgram();
    program.name = createSoftwareProgramDto.name;
    program.version = createSoftwareProgramDto.version;
    program.url = createSoftwareProgramDto.url;

    await this.softwareProgramsRepository.save(program);

    return program;
  }

  async findAll(): Promise<SoftwareProgram[]> {
    const programs: SoftwareProgram[] = await this.softwareProgramsRepository.find();

    return programs;
  }

  async findOne(id: number): Promise<SoftwareProgram | undefined> {
    const program: SoftwareProgram = await this.softwareProgramsRepository.findOne(id);

    return program;
  }

  async update(id: number, updateSoftwareProgramDto: UpdateSoftwareProgramDto) {
    const program = await this.findOne(id);

    // check which properties are set in the dto
    program.name = updateSoftwareProgramDto.name || program.name;
    program.version = updateSoftwareProgramDto.version || program.version;
    program.url = updateSoftwareProgramDto.url || program.url;

    await this.softwareProgramsRepository.save(program);

    return program;
  }

  async remove(id: number) {
    /*const program = await this.findOne(id);
    await this.softwareProgramsRepository.remove(program);*/
    return await this.softwareProgramsRepository.delete(id);
  }
}