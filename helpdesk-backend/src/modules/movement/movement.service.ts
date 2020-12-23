import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Colaborator, TechnicalArea, Ticket } from 'src/entity';
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
    const movement = new Movement();

    const ticket = await Ticket.findOne(createMovementDto.ticket_id);
    movement.ticket = ticket;

    const technical_area = await  TechnicalArea.findOne(createMovementDto.technical_area_id);
    movement.technical_area = technical_area;

    if(createMovementDto.colaborator_id){
      const colaborator = await Colaborator.findOne(createMovementDto.colaborator_id);
      movement.colaborator = colaborator;
    }

    if(createMovementDto.last_id){
      const last_movement = await Movement.findOne(createMovementDto.last_id);
      movement.parent = last_movement;
    }

    movement.priority = createMovementDto.priority || 0;
    movement.notified = createMovementDto.notified;
    movement.latest = createMovementDto.latest;

    await this.movementRepository.save(movement);

    return movement;
  }

  async findAll() {
    const movements: Movement[] = await this.movementRepository.find();

    return movements;
  }

  async findOne(id: number) {
    const movement: Movement = await this.movementRepository.findOne(id);

    return movement;
  }

  async update(id: number, updateMovementDto: UpdateMovementDto) {
    const movement = await this.findOne(id);

    movement.priority = updateMovementDto.priority || movement.priority;
    movement.notified = updateMovementDto.notified || movement.notified;
    movement.latest = updateMovementDto.latest || movement.latest;

    if(updateMovementDto.accepted)
    {
      movement.accepted_at = new Date(Date.now());
    }
    
    await this.movementRepository.save(movement);

    return movement;
  }

  async remove(id: number) {
    return await this.movementRepository.delete(id);
  }
}
