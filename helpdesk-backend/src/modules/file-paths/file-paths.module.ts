import { Module } from '@nestjs/common';
import { FilePathsService } from './file-paths.service';
import { FilePathsController } from './file-paths.controller';

@Module({
  controllers: [FilePathsController],
  providers: [FilePathsService]
})
export class FilePathsModule {}
