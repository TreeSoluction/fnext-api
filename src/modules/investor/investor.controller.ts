import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { InvestorService } from "./investor.service";
import { createInvestorDTO } from "../../dto/create/createInvestorDTO";
import { VerifyAccountDTO } from "../../dto/user/VerifyAccountDTO";
import { EOperations } from "../../enums/operationsResults/EOperations";
import { ERegisterOperation } from "src/enums/operationsResults/ERegisterOperation";

@Controller("investor")
export class InvestorController {
  constructor(private readonly investorService: InvestorService) {}

  @Post()
  @HttpCode(201)
  async register(@Body() createInvestorDto: createInvestorDTO) {
    const result = await this.investorService.register(createInvestorDto);

    if (result === ERegisterOperation.EMAIL_ALREADY_TAKEN) {
      throw new HttpException(
        "Existe uma conta cadastrada com esse email",
        HttpStatus.CONFLICT
      );
    }

    return result;
  }
}
