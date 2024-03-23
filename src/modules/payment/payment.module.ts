import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserService } from "src/modules/user/user.service";
import { EmailService } from "src/services/email/email.service";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PrismaClient, UserService, EmailService],
})
export class PaymentModule {}
