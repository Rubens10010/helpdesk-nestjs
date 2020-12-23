import { IsBoolean, IsDefined, IsInt,  IsNumber, IsOptional, Max, Min } from "class-validator";

export class CreateMovementDto {
    @IsDefined()
    @IsInt()
    ticket_id!: number;

    @IsOptional()
    @IsInt()
    last_id?: number;

    @IsDefined()
    @IsInt()
    technical_area_id: number;

    @IsNumber()
    @Min(0)
    @Max(5)
    priority: number;

    @IsOptional()
    @IsBoolean()
    notified?: boolean;

    @IsOptional()
    @IsBoolean()
    latest: boolean;

    @IsOptional()
    @IsInt()
    colaborator_id?: number;
}
