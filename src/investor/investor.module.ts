import { Module } from "@nestjs/common";
import { InvestorController } from "./investor.controller";
import { InvestorService } from "./investor.service";
import { PrismaClient } from "@prisma/client";
import { AuthModule } from "../auth/auth.module";
import { UserService } from "src/user/user.service";

@Module({
  imports: [AuthModule],
  controllers: [InvestorController],
  providers: [InvestorService, PrismaClient, UserService],
})
export class InvestorModule {}
