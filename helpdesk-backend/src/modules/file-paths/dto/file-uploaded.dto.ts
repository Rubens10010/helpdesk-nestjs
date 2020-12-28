import { IsInt, IsString, MaxLength, MinLength } from "class-validator";

export class FileUploadedDto {
    @IsString()
    @MinLength(5)
    @MaxLength(191)
    filename: string;

    @IsString()
    @MinLength(5)
    @MaxLength(191)
    mimetype: string;

    @IsString()
    @MinLength(5)
    @MaxLength(191)
    path: string;

    @IsInt()
    size: number;
}
