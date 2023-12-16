import {
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AddQuestionDTO {
  @MinLength(6)
  @MaxLength(256)
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsArray()
  @IsNotEmpty()
  variants: string[];
}
