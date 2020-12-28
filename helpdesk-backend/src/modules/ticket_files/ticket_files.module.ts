import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketFiles } from 'src/entity/ticket_files.entity';
import { TicketFilesController } from './ticket_files.controller';
import { TicketFilesService } from './ticket_files.service';

@Module({
  controllers: [TicketFilesController],
  providers: [TicketFilesService],
  exports: [TicketFilesService],
  imports: [TypeOrmModule.forFeature([TicketFiles])]
})
export class TicketFilesModule {}
