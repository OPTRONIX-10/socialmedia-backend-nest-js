import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {

  

  @IsEmail()
  @MaxLength(100)
  email!: string;

  @IsNotEmpty()
  @MaxLength(24)
  userName!: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @MaxLength(100)
  password!: string;
}
