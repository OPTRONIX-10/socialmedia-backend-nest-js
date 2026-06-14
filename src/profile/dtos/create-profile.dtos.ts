import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProfileDto{
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  firstName?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @MaxLength(100)
  lastName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  gender?: string;

  @IsString()
  @IsOptional()
  bio?: string

  @IsDate()
  @IsOptional()
  dateOfBirth?: Date

  @IsString()
  @IsOptional()
  profileImage ?: string

}