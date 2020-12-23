import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';
import { CreateMovementDto } from './create-movement.dto';

export class UpdateMovementDto extends PartialType(CreateMovementDto) {
    @IsBoolean()
    accepted: boolean;
}
