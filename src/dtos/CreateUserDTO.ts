import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  password: string;

  @Min(1)
  @IsNotEmpty()
  @IsNumber()
  role_id: number;
}
