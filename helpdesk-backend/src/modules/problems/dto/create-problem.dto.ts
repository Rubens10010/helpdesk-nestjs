import { IsInt, IsString } from "class-validator";

export class CreateProblemDto {
    @IsString()
    readonly title: string;

    @IsString()
    readonly description?: string;

    @IsInt()
    readonly technical_area_id: number;
    
    @IsInt()
    readonly software_program_id: number;
}