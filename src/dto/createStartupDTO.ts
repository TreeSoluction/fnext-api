import { IsNotEmpty, MinLength } from "class-validator";

export class createStartupDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  birth_date: string;
  @IsNotEmpty()
  cnpj: string;
}
