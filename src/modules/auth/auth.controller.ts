import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { EOperations } from "src/enums/operationsResults/EOperations";
import { loginDTO } from "./loginDTO";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async signIn(@Body() dto: loginDTO) {
    console.log(`LOGIN TRY WITH ${dto.email} and ${dto.password}`);

    const response = await this.authService.signIn(dto);

    if (response === EOperations.FAIL) {
      throw new HttpException("Incorrect password", HttpStatus.UNAUTHORIZED);
    }
    if (response === EOperations.NOT_FOUND) {
      throw new HttpException("User not founded", HttpStatus.NOT_FOUND);
    }
    return response;
  }

  @HttpCode(HttpStatus.OK)
  @Post("verifyAuth")
  async verifyAuth(@Body() token: string) {
    const response = await this.authService.verifyToken(token);

    if (response === false) {
      throw new HttpException("Incorrect password", HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
