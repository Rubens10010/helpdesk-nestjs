import { Injectable } from '@nestjs/common';
import { CreateFilePathDto } from './dto/create-file-path.dto';
import { UpdateFilePathDto } from './dto/update-file-path.dto';

@Injectable()
export class FilePathsService {
  create(createFilePathDto: CreateFilePathDto) {
    return 'This action adds a new filePath';
  }

  findAll() {
    return `This action returns all filePaths`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filePath`;
  }

  update(id: number, updateFilePathDto: UpdateFilePathDto) {
    return `This action updates a #${id} filePath`;
  }

  remove(id: number) {
    return `This action removes a #${id} filePath`;
  }
}
