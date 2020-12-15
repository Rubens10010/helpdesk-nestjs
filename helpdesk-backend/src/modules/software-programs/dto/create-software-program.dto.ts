import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateSoftwareProgramDto {
    @IsString()
    @MinLength(3, {
        message: 'Name is too short',
      })
    @MaxLength(191, {
        message: 'Name is too long. Maximal length is $constraint1 characters, but actual is $value',
    })
    name: string;

    @IsString()
    @MinLength(3, {
        message: 'Version is too short',
      })
    @MaxLength(100, {
        message: 'Version is too long. Maximal length is $constraint1 characters, but actual is $value',
    })
    version: string;

    @IsString()
    @MinLength(10, {
        message: 'url is too short',
      })
    @MaxLength(255, {
        message: 'url is too long. Maximal length is $constraint1 characters, but actual is $value',
    })
    url: string;
}
