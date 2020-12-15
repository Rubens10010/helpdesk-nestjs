import { PartialType } from '@nestjs/mapped-types';
import { IsEnum } from 'class-validator';
import { TechnicalAreaStatus } from 'src/entity';
import { EnumToString } from 'src/helpers/enumToString';
import { CreateTechAreaDTO } from './create-techarea.dto';

export class UpdateTechAreaDTO extends PartialType(CreateTechAreaDTO) {
  @IsEnum(TechnicalAreaStatus, {
      message: `Opcion invalida. Las opciones correctas son "${ EnumToString(TechnicalAreaStatus)}"`
  })
  status?: TechnicalAreaStatus;
}
