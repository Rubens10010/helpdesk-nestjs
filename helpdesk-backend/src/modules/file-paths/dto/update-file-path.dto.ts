import { PartialType } from '@nestjs/mapped-types';
import { IsNumberString, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateFilePathDto } from './create-file-path.dto';

export class UpdateFilePathDto extends PartialType(CreateFilePathDto) {
    @IsString()
    @MinLength(10)
    @MaxLength(255)
    url: string;

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    readonly extension: string;

    @IsNumberString()
    size: number;
}
