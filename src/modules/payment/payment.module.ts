import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PrismaClient],
})
export class PaymentModule {}
