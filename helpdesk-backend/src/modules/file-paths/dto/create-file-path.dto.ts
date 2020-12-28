import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateFilePathDto {
    @IsString()
    @MinLength(5)
    @MaxLength(191)
    name: string;
}
