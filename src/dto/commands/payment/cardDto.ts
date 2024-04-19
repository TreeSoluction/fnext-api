import { IsNotEmpty } from "class-validator";

export class cardDto {
  @IsNotEmpty()
  card_number: string;

  @IsNotEmpty()
  expiration_year: string;

  @IsNotEmpty()
  expiration_month: string;

  @IsNotEmpty()
  security_code: string;

  @IsNotEmpty()
  cardholder_identification_type: string;

  @IsNotEmpty()
  cardholder_identification_number: string;

  @IsNotEmpty()
  cardholder_name: string;
}
