import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { FenextResponse } from "src/domain/responses/fenextResponse";
import { serialize } from "v8";
import { PaymentService } from "./payment.service";
import IController from "src/domain/interfaces/IController";

@Controller("payment")
export class PaymentController implements IController {
  private paymentService: PaymentService;
  constructor(service: PaymentService) {
    this.paymentService = service;
  }
  register(dto: any): Promise<FenextResponse> {
    throw new Error("Method not implemented.");
  }
  getAll(page?: number, countPerPage?: number): Promise<FenextResponse> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<FenextResponse> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<FenextResponse> {
    throw new Error("Method not implemented.");
  }

  @Get()
  @HttpCode(200)
  async getCardToken(): Promise<FenextResponse> {
    return await this.paymentService.createCardToken();
  }
}
