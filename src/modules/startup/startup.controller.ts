import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { StartupService } from "./startup.service";
import { ERegisterOperation } from "src/enums/operationsResults/ERegisterOperation";
import { createStartupDTO } from "src/dto/create/createStartupDTO";

@Controller("startup")
export class StartupController {
  constructor(private readonly startupService: StartupService) {}

  @Post()
  @HttpCode(201)
  async register(@Body() createStartupDto: createStartupDTO) {
    const result = await this.startupService.register(createStartupDto);

    if (result === ERegisterOperation.EMAIL_ALREADY_TAKEN) {
      throw new HttpException(
        "Existe uma conta cadastrada com esse email",
        HttpStatus.CONFLICT
      );
    }

    if (result === ERegisterOperation.CNPJ_ALREADY_TAKEN) {
      throw new HttpException(
        "Existe uma empresa usando esse CNPJ. Entre em contato conosco caso suspeite de fraude",
        HttpStatus.CONFLICT
      );
    }

    return result;
  }
}
