import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileCondition, FilePath } from 'src/entity';
import { StorageService } from '../storage/storage.service';
import { FileUploadedDto } from './dto/file-uploaded.dto';
import { UpdateFilePathDto } from './dto/update-file-path.dto';
import {FilePathsRepository} from './file-paths.repository';

@Injectable()
export class FilePathsService {
  constructor(
    @InjectRepository(FilePath) 
    private filePathsRepository: FilePathsRepository, private storageService: StorageService
  ) {}

  async create(filesUploaded: FileUploadedDto[]) {
   let file_paths_ids = [];

   for(const element of filesUploaded){
      const file: FilePath = new FilePath();
      file.name = element.filename;
      file.extension = element.mimetype;
      file.url = element.path;
      file.size = Math.round((element.size)/1024); // Kbs
      file.condition = FileCondition.UNLINKED;

      await this.filePathsRepository.save(file, { reload: true });

      file_paths_ids.push(file.id);
    };

    return {
      file_paths_ids,
      error: false
    }
  }

  async findAll() {
    const filepaths: FilePath[] = await this.filePathsRepository.find();
    return filepaths;
  }

  async findOne(uuid: string) {
    const filepath: FilePath = await this.filePathsRepository.findOne(uuid);

    if (!filepath)
      throw new NotFoundException(`File with the id ${uuid} was not found`);

    return {
      data: this.storageService.getFile(filepath.url),
      filepath
    };

    //return filepath;
  }

  update(id: number, updateFilePathDto: UpdateFilePathDto) {
    return `This action updates a #${id} filePath`;
  }

  async remove(id: number) {
    return await this.filePathsRepository.delete(id);
  }
}
