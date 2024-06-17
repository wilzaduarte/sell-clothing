import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @MinLength(8)
  // @Matches(/(?=.*\d)|(?=.*\w)|(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password too weak',
  // })
  @IsNotEmpty()
  password: string;

  @IsString()
  lastName: string;
}
export class signinDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  // @Matches(/(?=.*\d)|(?=.*\w)|(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Senha muito fraca(Password too weak)',
  // })
  @IsNotEmpty()
  password: string;
}

export interface payloadData{
  sub: string; //id
  email: string;
  roles: string;
  iat: number
}
