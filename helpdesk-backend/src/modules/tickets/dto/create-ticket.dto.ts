import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { TicketChannel } from "src/entity/ticket.entity";
import { EnumToString } from "src/helpers/enumToString";

export class CreateTicketDto {
    /*@IsNumber()
    @Min(1)
    code: number;*/

    @IsNumber()
    @Min(2020)
    year: number;

    @IsString()
    @MinLength(10, {
        message: 'Problem description is too short',
      })
    @MaxLength(500, {
        message: 'Problem description is too long. Maximal length is $constraint1 characters, but actual is $value',
    })
    problem_description: string;

    /*@IsOptional()
    @IsInt()
    photo_1_id?: number;

    @IsOptional()
    @IsInt()
    photo_2_id?: number;*/

    /*@IsNumber()
    @Min(1)
    @Max(5)
    satisfaction: number;*/

    @IsEnum(TicketChannel, {
        message: `Opcion invalida. Las opciones correctas son "${ EnumToString(TicketChannel)}"`
    })
    channel: TicketChannel;

    /*@IsBoolean()
    scaled: boolean;*/

    @IsNotEmpty()
    @IsInt()
    readonly user_id: number;

    @IsOptional()
    @IsInt()
    readonly problem_id?: number;
}