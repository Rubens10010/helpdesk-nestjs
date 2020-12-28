import { Module } from '@nestjs/common';
import { FilePathsService } from './file-paths.service';
import { FilePathsController } from './file-paths.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilePath } from 'src/entity';
import { StorageService } from '../storage/storage.service';

@Module({
  controllers: [FilePathsController],
  providers: [FilePathsService, StorageService],
  exports: [FilePathsService],
  imports: [TypeOrmModule.forFeature([FilePath]), ],
})
export class FilePathsModule {}
