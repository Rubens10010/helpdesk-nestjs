import { IsBoolean, IsEnum, IsInt, IsString } from "class-validator";
import { ColaboratorStatus } from "src/entity/colaborator.entity";
import { EnumToString } from 'src/helpers/enumToString'

export class CreateColaboratorDTO {
    @IsString()
    readonly nickname: string;

    @IsBoolean()
    readonly available?: boolean;

    @IsBoolean()
    readonly lead?: boolean;

    @IsInt()
    readonly user_id: number;

    @IsInt()
    readonly technical_area_id: number;

    @IsEnum(ColaboratorStatus, {
        message: `Opcion invalida. Las opciones correctas son "${ EnumToString(ColaboratorStatus)}"`
    })
    status: ColaboratorStatus
}