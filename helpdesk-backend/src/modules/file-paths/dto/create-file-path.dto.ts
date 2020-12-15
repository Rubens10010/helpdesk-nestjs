import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateFilePathDto {
    @IsString()
    @MinLength(5)
    @MaxLength(191)
    name: string;

    @IsString()
    @MinLength(4)
    @MaxLength(100)
    extension: string;

    @IsString()
    @MinLength(10)
    @MaxLength(255)
    url: string;
}
