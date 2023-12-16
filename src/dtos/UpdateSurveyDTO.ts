import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateSurveyDTO {
  @MinLength(8)
  @MaxLength(50)
  @IsString()
  @IsOptional()
  title?: string;

  @MaxLength(256)
  @IsString()
  @IsOptional()
  description?: string;
}
