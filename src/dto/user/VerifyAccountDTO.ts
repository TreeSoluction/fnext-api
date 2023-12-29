import { IsNotEmpty, IsNumber } from "class-validator";
export class VerifyAccountDTO {
  @IsNotEmpty()
  code: string;
  @IsNotEmpty()
  @IsNumber()
  userid: number;
}
