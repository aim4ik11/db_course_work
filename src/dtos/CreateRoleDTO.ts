import {
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRoleDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  name: string;

  @IsArray()
  @IsNotEmpty()
  permissions: number[];
}
