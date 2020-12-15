import { IsBoolean, IsDefined, IsInt, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateAttentionDto {
    @IsDefined()
    @IsNumber()
    movement_id!: number;

    @IsString()
    code: string;

    @IsString()
    @MaxLength(255)
    extra_message: string;
  
    @IsOptional()
    @IsBoolean()
    replied?: boolean;

    @IsNumber()
    @Min(1)
    @Max(5)
    satisfaction: number;

    @IsNumber()
    @Min(1)
    @Max(5)
    reopen_attention: number;

    @IsDefined()
    @IsInt()
    problem_solution_id: number;
}
