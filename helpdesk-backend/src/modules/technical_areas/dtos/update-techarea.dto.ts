import { TechnicalAreaStatus } from "src/entity/technical_area.entity";

export class UpdateTechAreaDTO {
  name?: string;
  email?: string;
  phone?: string;
  status?: TechnicalAreaStatus;
}