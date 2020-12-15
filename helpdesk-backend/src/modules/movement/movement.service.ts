import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoftwareProgram } from 'src/entity';
import { Movement } from 'src/entity/movement.entity';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { MovementRepository } from './movement.repository';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Movement) 
    private movementRepository: MovementRepository,
  ) {}

  async create(createMovementDto: CreateMovementDto) {
    const movement = new SoftwareProgram();

    await this.movementRepository.save(movement);

    return movement;
  }

  findAll() {
    return `This action returns all movement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movement`;
  }

  update(id: number, updateMovementDto: UpdateMovementDto) {
    return `This action updates a #${id} movement`;
  }

  remove(id: number) {
    return `This action removes a #${id} movement`;
  }
}
