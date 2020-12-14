import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Colaborator } from 'src/entity/colaborator.entity';
import { TechnicalArea } from 'src/entity/technical_area.entity';
import { User } from 'src/entity/user.entity';
import { ColaboratorRepository } from './colaborator.repository';
import { CreateColaboratorDTO } from './dtos/create-colaborator.dto';
import { UpdateColaboratorDTO } from './dtos/update-colaborator.dto';

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

  public async createOne(createColaboratoRequest: CreateColaboratorDTO) {
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

  public async updateOne(id: number, updateColaboratorDTO: UpdateColaboratorDTO) {
    // fetch and check if task exists.
    const colaborator: Colaborator = await this.getOne(id);

    if(updateColaboratorDTO.user_id){
      const user: User = await User.findOne(updateColaboratorDTO.user_id);
      colaborator.profile = user ||colaborator.profile;
    }

    if(updateColaboratorDTO.technical_area_id){
      const technicalArea: TechnicalArea = await TechnicalArea.findOne(updateColaboratorDTO.technical_area_id);
      colaborator.technical_area = technicalArea || colaborator.technical_area;
    }

    // check which properties are set in the dto
    colaborator.nickname = updateColaboratorDTO.nickname || colaborator.nickname;
    colaborator.available = updateColaboratorDTO.available || colaborator.available;
    //colaborator.lead = updateColaboratorDTO.lead || colaborator.lead;

    // update the properties on the task
    await this.colaboratorRepository.save(colaborator);

    return colaborator;
  }

  public async deleteOne(id: number) {
    /*const colaborator: Colaborator = await this.getOne(id);
    if(!colaborator){
      return null;
    }

    return await this.colaboratorRepository.remove(colaborator);*/
    return await this.colaboratorRepository.delete(id);
  }
}