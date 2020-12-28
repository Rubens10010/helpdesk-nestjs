import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFiles,  ParseUUIDPipe, Req, Res } from '@nestjs/common';
import { FilePathsService } from './file-paths.service';
import { CreateFilePathDto } from './dto/create-file-path.dto';
import { UpdateFilePathDto } from './dto/update-file-path.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { getDestinationPath, editFileName, imageFileFilter } from 'src/helpers/file-upload.utils';
import {diskStorage} from 'multer';
import { FileUploadedDto } from './dto/file-uploaded.dto';
import { Response } from 'express';

@Controller('file-paths')
export class FilePathsController {
  constructor(private readonly filePathsService: FilePathsService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 5, { 
    storage: diskStorage({
      destination: getDestinationPath,
      filename: editFileName
    }),
    fileFilter: imageFileFilter
  })
  )
  create(@UploadedFiles() files, @Body() createFilePathDto: CreateFilePathDto) {
    const filesUploaded: FileUploadedDto[] = files.map(x =>  {
      return { 
        size: x.size,
        filename: x.filename,
        mimetype: x.mimetype,
        path: x.path
      };
    });

    return this.filePathsService.create(filesUploaded);
  }

  @Get()
  findAll() {
    return this.filePathsService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string, @Req() request, @Res() response: Response) {
    const {data, filepath} = await this.filePathsService.findOne(uuid);
    response.set('Content-Type', filepath.extension);
    response.set('filename', filepath.name);

    return response.send(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFilePathDto: UpdateFilePathDto) {
    return this.filePathsService.update(+id, updateFilePathDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filePathsService.remove(+id);
  }
}
