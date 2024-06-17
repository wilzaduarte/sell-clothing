import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClothDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsString()
  link: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class UpdateClothDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsString()
  link: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
