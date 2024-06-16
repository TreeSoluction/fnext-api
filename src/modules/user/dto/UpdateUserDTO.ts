import { IsNotEmpty } from "class-validator";

export class UpdateUserDTO {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  fullName: string;
  @IsNotEmpty()
  email: string;
}
