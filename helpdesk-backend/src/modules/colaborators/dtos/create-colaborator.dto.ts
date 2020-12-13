export class CreateColaboratorDTO {
    readonly nickname: string;
    readonly available?: boolean;
    readonly lead?: boolean;
    readonly user_id: number;
    readonly technical_area_id: number;
}