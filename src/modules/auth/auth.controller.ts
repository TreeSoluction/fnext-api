import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginDTO } from "src/dto/commands/login/loginDTO";
import { EOperations } from "src/enums/operationsResults/EOperations";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async signIn(@Body() dto: loginDTO) {
    const response = await this.authService.signIn(dto);

    if (response === EOperations.FAIL) {
      throw new HttpException("Incorrect password", HttpStatus.UNAUTHORIZED);
    }
    if (response === EOperations.NOT_FOUND) {
      throw new HttpException("User not founded", HttpStatus.NOT_FOUND);
    }
    return response;
  }
}
