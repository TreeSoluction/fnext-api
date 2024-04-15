import { IsNotEmpty } from "class-validator";

export class buyerDto {
  @IsNotEmpty()
  id: number;
}
