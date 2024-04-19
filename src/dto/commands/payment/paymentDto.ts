import { IsNotEmpty } from "class-validator";
import { buyerDto } from "./buyerDto";
import { cardDto } from "./cardDto";

export class paymentDto {
  @IsNotEmpty()
  planNumber: number;
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  card: cardDto;
}
