import { PartialType } from "@nestjs/mapped-types";
import { OmitType } from "@nestjs/swagger";
import { CreateColaboratorDTO } from "./create-colaborator.dto";

export class UpdateColaboratorDTO extends PartialType(
    OmitType(CreateColaboratorDTO, ['lead'] as const)
) {}