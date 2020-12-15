import { PartialType } from '@nestjs/mapped-types';
import { CreateReplyDto } from './create-solution.dto';

export class UpdateReplyDto extends PartialType(CreateReplyDto) {}
