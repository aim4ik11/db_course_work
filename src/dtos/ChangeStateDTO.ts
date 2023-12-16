import { IsEnum, IsNotEmpty } from 'class-validator';
import { SurveyState } from '@prisma/client';

export class ChangeStateDTO {
  @IsNotEmpty()
  @IsEnum(SurveyState)
  state: SurveyState;
}
