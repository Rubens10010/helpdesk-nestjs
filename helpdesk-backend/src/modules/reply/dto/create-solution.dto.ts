import { IsEnum, IsInt,  IsNotEmpty,  IsString, MaxLength, MinLength } from "class-validator";
import { ReplySource } from "src/entity/reply.entity";
import { EnumToString } from "src/helpers/enumToString";

export class CreateReplyDto {
    @IsNotEmpty()
    @IsInt()
    attention_id: number;

    @IsString()
    @MinLength(2)
    @MaxLength(500)
    message: string;

    @IsEnum(ReplySource, {
        message: `Opcion invalida. Las opciones correctas son "${ EnumToString(ReplySource)}"`
    })
    source: ReplySource;
}
