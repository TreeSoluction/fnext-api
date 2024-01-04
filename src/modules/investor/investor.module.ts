import { Module } from "@nestjs/common";
import { InvestorController } from "./investor.controller";
import { InvestorService } from "./investor.service";
import { PrismaClient } from "@prisma/client";
import { AuthModule } from "../auth/auth.module";
import { UserService } from "src/modules/user/user.service";
import { EmailService } from "src/services/email/email.service";

@Module({
  imports: [AuthModule],
  controllers: [InvestorController],
  providers: [InvestorService, PrismaClient, UserService, EmailService],
})
export class InvestorModule {}
