import { IsNotEmpty } from "class-validator";

export class PasswordChangeDTO {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  newPassword: string;
  @IsNotEmpty()
  password: string;
}
