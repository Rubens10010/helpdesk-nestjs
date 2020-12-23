import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { CreateAttentionDto } from './create-attention.dto';

export class UpdateAttentionDto extends PartialType(CreateAttentionDto) {
    @IsOptional()
    @IsBoolean()
    replied?: boolean;

    @IsNumber()
    @Min(1)
    @Max(5)
    satisfaction: number;
}
