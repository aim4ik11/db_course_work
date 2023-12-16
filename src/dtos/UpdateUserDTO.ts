import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDTO {
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  @IsString()
  firstname?: string;

  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  @IsString()
  lastname?: string;

  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  @IsString()
  nickname?: string;
}
