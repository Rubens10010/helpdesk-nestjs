import { IsBoolean, IsIn, IsInt, IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateProblemSolutionDto {
    @IsNotEmpty()
    @IsInt()
    problem_id!: number;


    @IsNotEmpty()
    @IsInt()
    solution_id!: number;

    @IsBoolean()
    prefered: boolean;

    @IsNumber()
    @Min(0)
    @Max(9)
    rank: number;
}
