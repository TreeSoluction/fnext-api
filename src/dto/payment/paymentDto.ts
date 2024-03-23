import { IsNotEmpty } from "class-validator";
import { buyerDto } from "./buyerDto";
import { cardDto } from "./cardDto";

export class paymentDto {
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  buyer: buyerDto;
  @IsNotEmpty()
  card: cardDto;
}
