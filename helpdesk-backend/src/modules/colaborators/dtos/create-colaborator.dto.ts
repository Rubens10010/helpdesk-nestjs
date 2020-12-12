export class CreateColaboratorDTO {
    nickname: string;
    available?: boolean;
    lead?: boolean;
    user_id: number;
    technical_area_id: number;
}