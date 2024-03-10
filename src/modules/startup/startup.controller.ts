import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { StartupService } from "./startup.service";
import { ERegisterOperation } from "src/enums/operationsResults/ERegisterOperation";
import { createStartupDTO } from "src/dto/create/createStartupDTO";
import { RegisterBusinessDataDTO } from "src/dto/startup/RegisterBusinessDataDTO";

@Controller("startup")
export class StartupController {
  constructor(private readonly startupService: StartupService) {}

  @Get()
  @HttpCode(200)
  async getData(@Query("id") startupId) {
    const result = await this.startupService.getData(startupId);
    return result;
  }

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

  @Put()
  @HttpCode(200)
  async registerBusinessData(
    @Body() registerBusinessDataDTO: RegisterBusinessDataDTO
  ) {
    const result = await this.startupService.registerBusinessData(
      registerBusinessDataDTO
    );

    return result;
  }
}
