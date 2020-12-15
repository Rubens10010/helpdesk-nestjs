import { IsDefined, IsInt, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateSolutionDto {
    @IsString()
    @MinLength(10, {
        message: 'Content is too short',
      })
    @MaxLength(500, {
        message: 'Content is too long. Maximal length is $constraint1 characters, but actual is $value',
    })
    content: string;

    @IsString()
    @MinLength(10, {
        message: 'Abstract is too short',
      })
    @MaxLength(100, {
        message: 'Abstract is too long. Maximal length is $constraint1 characters, but actual is $value',
    })
    short: string;

    @IsOptional()
    @IsString()
    @MaxLength(191, {
        message: 'Maximal length is $constraint1 characters, but actual is $value',
    })
    help_url?: string;

    @IsDefined()
    @IsInt()
    user_id: number
}
