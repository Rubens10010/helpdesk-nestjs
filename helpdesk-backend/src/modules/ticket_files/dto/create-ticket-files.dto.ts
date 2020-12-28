import { IsDefined, IsInt, IsUUID } from "class-validator";

export class CreateTicketFilesDto {
    @IsDefined()
    @IsInt()
    ticket_id: number

    @IsDefined()
    @IsUUID()
    file_path_id: string
}
