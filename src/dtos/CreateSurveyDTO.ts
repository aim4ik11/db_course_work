import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSurveyDTO {
  @MinLength(8)
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  title: string;

  @MaxLength(256)
  @IsString()
  @IsOptional()
  description?: string;
}
