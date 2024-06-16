import {
  IsDataURI,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateOwnerDTO {
  @IsNotEmpty()
  @IsString()
  userID: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsDateString()
  birth_date: Date;
  @IsOptional()
  @IsString()
  cpf: string;
}
