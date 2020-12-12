import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TechnicalArea, TechnicalAreaStatus } from 'src/entity/technical_area.entity';
import { CreateTechAreaDTO } from './dtos/create-techarea.dto';
import { UpdateTechAreaDTO } from './dtos/update-techarea.dto';
import { TechnicalAreaRepository } from './technical_area.repository';

@Injectable()
export class TechnicalAreaService {
  constructor(
    @InjectRepository(TechnicalArea) 
    private technicalAreaRepository: TechnicalAreaRepository,
  ) {}

  async findAll(): Promise<TechnicalArea[]> {
    const techAreas: TechnicalArea[] = await this.technicalAreaRepository.find();
    //const tasksDTO: TaskDTO[] = tasks.map((x) => this.entityToDTO(x));
    return techAreas;
  }

  public async getOne(techAreaId: number) {
    const techArea: TechnicalArea = await this.technicalAreaRepository.findOne(techAreaId);

    if (!techArea)
      throw new NotFoundException(`Task with the id ${techAreaId} was not found`);

    //const taskDTO: TaskDTO = this.entityToDTO(task);

    return techArea;
  }

  public async createOne(createTaskRequest: CreateTechAreaDTO) {
    const techArea: TechnicalArea = new TechnicalArea();
    techArea.name = createTaskRequest.name;
    techArea.phone = createTaskRequest.phone;
    techArea.email = createTaskRequest.email;
    techArea.status = TechnicalAreaStatus.Created;

    await this.technicalAreaRepository.save(techArea);

    //const taskDTO = this.entityToDTO(task);

    return techArea;
  }

  /*private entityToDTO(task: Task): TaskDTO {
    const taskDTO = new TaskDTO();
    taskDTO.id = task.id;
    taskDTO.title = task.title;
    taskDTO.description = task.description;
    taskDTO.status = task.status;
    return taskDTO;
  }*/

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
  }

  public async deleteOne(id: number) {
    const techArea: TechnicalArea = await this.getOne(id);
    await this.technicalAreaRepository.remove(techArea);
  }
}