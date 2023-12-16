import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateQuestionDTO {
  @MinLength(6)
  @MaxLength(256)
  @IsOptional()
  @IsString()
  text?: string;

  @IsArray()
  @IsOptional()
  variants?: string[];
}
