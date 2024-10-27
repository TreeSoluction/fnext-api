import { IsNotEmpty } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty()
  fullName: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  phone: string;
}
