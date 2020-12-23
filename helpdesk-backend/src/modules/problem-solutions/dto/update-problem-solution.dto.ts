import { PartialType } from '@nestjs/mapped-types';
import { CreateProblemSolutionDto } from './create-problem-solution.dto';

export class UpdateProblemSolutionDto extends PartialType(CreateProblemSolutionDto) {

}
