import { Injectable } from '@nestjs/common';
import { CreateSoftwareProgramDto } from './dto/create-software-program.dto';
import { UpdateSoftwareProgramDto } from './dto/update-software-program.dto';

@Injectable()
export class SoftwareProgramsService {
  create(createSoftwareProgramDto: CreateSoftwareProgramDto) {
    return 'This action adds a new softwareProgram';
  }

  findAll() {
    return `This action returns all softwarePrograms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} softwareProgram`;
  }

  update(id: number, updateSoftwareProgramDto: UpdateSoftwareProgramDto) {
    return `This action updates a #${id} softwareProgram`;
  }

  remove(id: number) {
    return `This action removes a #${id} softwareProgram`;
  }
}
