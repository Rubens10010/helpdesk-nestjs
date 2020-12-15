import { PartialType } from '@nestjs/mapped-types';
import { CreateSoftwareProgramDto } from './create-software-program.dto';

export class UpdateSoftwareProgramDto extends PartialType(CreateSoftwareProgramDto) {}
