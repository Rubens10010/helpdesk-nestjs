import { IsString } from "class-validator";

export class CreateTechAreaDTO {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    phone?: string;
}