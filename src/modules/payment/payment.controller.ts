import {
  Controller,
  HttpCode,
  Post,
  Get,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { paymentDto } from "src/dto/payment/paymentDto";
import { EOperations } from "src/enums/operationsResults/EOperations";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @Get()
  // @HttpCode(200)
  // async getCardTokenId() {
  //   const result = await this.paymentService.createCardToken();
  //   return result;
  // }

  @Post()
  @HttpCode(200)
  async createPayment(@Body() dto: paymentDto) {
    const result = await this.paymentService.createPayment(
      dto.amount,
      dto.card,
      dto.buyer
    );

    if (result === EOperations.FAIL) {
      throw new HttpException(
        "Erro ao realizar o pagamento",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return result;
  }
}
