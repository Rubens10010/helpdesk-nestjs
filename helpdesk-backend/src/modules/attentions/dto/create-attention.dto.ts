import { IsDefined, IsInt, IsNumber,  IsString, Max, MaxLength, Min } from "class-validator";

export class CreateAttentionDto {
    @IsDefined()
    @IsNumber()
    movement_id!: number;

    @IsString()
    @MaxLength(255)
    subject: string;

    @IsDefined()
    @IsInt()
    problem_solution_id: number;

    @IsNumber()
    @Min(1)
    @Max(5)
    reopen_attention: number;
}
