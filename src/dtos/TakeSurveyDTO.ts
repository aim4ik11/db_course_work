import { IsArray, IsNotEmpty } from 'class-validator';

export class TakeSurveyDTO {
  @IsArray()
  @IsNotEmpty()
  answerIds: number[];
}
