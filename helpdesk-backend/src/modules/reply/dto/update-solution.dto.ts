import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { ReplyCondition } from 'src/entity';
import { EnumToString } from 'src/helpers/enumToString';
import { CreateReplyDto } from './create-solution.dto';

export class UpdateReplyDto extends PartialType(CreateReplyDto) {
    @IsOptional()
    @IsEnum(ReplyCondition, {
        message: `Opcion invalida. Las opciones correctas son "${ EnumToString(ReplyCondition)}"`
    })
    condition?: ReplyCondition;
}
