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
import { paymentDto } from "src/dto/commands/payment/paymentDto";
import { EOperations } from "src/enums/operationsResults/EOperations";
import { UserService } from "../user/user.service";

@Controller("payment")
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly userService: UserService
  ) {}

  // @Get()
  // @HttpCode(200)
  // async getCardTokenId() {
  //   const result = await this.paymentService.createCardToken();
  //   return result;
  // }

  // @Post()
  // @HttpCode(200)
  // async createPayment(@Body() dto: paymentDto) {
  //   var user = await this.userService.get(dto.userId);

  //   if (user.NOT_FOUND) {
  //     throw new HttpException("Usuario nao encontrado", HttpStatus.NOT_FOUND);
  //   }

  //   const result = await this.paymentService.createPayment(
  //     dto.card,
  //     user.email,
  //     dto.planNumber
  //   );

  //   if (result === EOperations.FAIL) {
  //     throw new HttpException(
  //       "Erro ao realizar o pagamento",
  //       HttpStatus.INTERNAL_SERVER_ERROR
  //     );
  //   }

  //   return result;
  // }
}
