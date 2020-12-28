import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketFilesDto } from './create-ticket-files.dto';

export class UpdateTicketFilesDto extends PartialType(CreateTicketFilesDto) {}
