import { IsString, IsBoolean, IsArray, IsOptional } from 'class-validator';

export class UpdateUserAccountDTO {
  @IsString()
  google_id: string;

  @IsString()
  email: string;

  @IsString()
  photo_url: string;

  @IsString()
  refresh_token: string;
}
