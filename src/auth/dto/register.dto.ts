import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Name must not be empty' })
  @IsString({ message: 'Name bust be string type' })
  @MinLength(3, { message: 'Name must be 3 character long' })
  @MaxLength(50, { message: 'Name can not be longer than 50 character' })
  name: string;

  @IsNotEmpty({ message: 'Password must not be empty' })
  @MinLength(6, { message: 'Password must be 6 character long' })
  password: string;
}
