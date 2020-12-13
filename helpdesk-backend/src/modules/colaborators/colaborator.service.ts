import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Colaborator } from 'src/entity/colaborator.entity';
import { TechnicalArea } from 'src/entity/technical_area.entity';
import { User } from 'src/entity/user.entity';
import { ColaboratorRepository } from './colaborator.repository';
import { CreateColaboratorDTO } from './dtos/create-colaborator.dto';

@Injectable()
export class ColaboratorService {
  constructor(
    @InjectRepository(Colaborator) 
    private colaboratorRepository: ColaboratorRepository,
  ) {}

  async findAll(): Promise<Colaborator[]> {
    const colaborators: Colaborator[] = await this.colaboratorRepository.find();
    return colaborators;
  }

  public async getOne(id: number) {
    const colaborator: Colaborator = await this.colaboratorRepository.findOne(id);

    if (!id)
      throw new NotFoundException(`Task with the id ${id} was not found`);

    return colaborator;
  }

  public async createOne(createColaboratoRequest: CreateColaboratorDTO/*, user: User, tech_area: TechnicalArea*/) {
    const user: User = await User.findOne(createColaboratoRequest.user_id);
    const technicalArea: TechnicalArea = await TechnicalArea.findOne(createColaboratoRequest.technical_area_id);

    const colaborator: Colaborator = new Colaborator();
    colaborator.nickname = createColaboratoRequest.nickname;
    colaborator.available = createColaboratoRequest.available || false;
    colaborator.lead = createColaboratoRequest.lead || false;
    colaborator.profile = user;
    colaborator.technical_area = technicalArea;
    await this.colaboratorRepository.save(colaborator);
    return colaborator;
  }

/*
  public async updateOne(taskId: number, updateTechAreaRequest: UpdateTechAreaDTO) {
    console.log(updateTechAreaRequest);
    // fetch and check if task exists.
    const techArea: TechnicalArea = await this.getOne(taskId);

    // check which properties are set in the dto
    techArea.name = updateTechAreaRequest.name || techArea.name;
    techArea.email = updateTechAreaRequest.email || techArea.email;
    techArea.phone = updateTechAreaRequest.phone || techArea.phone;
    techArea.status = updateTechAreaRequest.status;

    // update the properties on the task
    await this.technicalAreaRepository.save(techArea);
    //const taskDTO: TaskDTO = this.entityToDTO(task);

    return techArea;
  }*/

  public async deleteOne(id: number) {
    const colaborator: Colaborator = await this.getOne(id);
    await this.colaboratorRepository.remove(colaborator);
  }
}