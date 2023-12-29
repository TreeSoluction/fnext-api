import { Module } from "@nestjs/common";
import { StartupController } from "./startup.controller";
import { PrismaClient } from "@prisma/client";
import { StartupService } from "./startup.service";
import { UserService } from "src/modules/user/user.service";
import { EmailService } from "src/services/email/email.service";

@Module({
  controllers: [StartupController],
  providers: [StartupService, PrismaClient, UserService, EmailService],
})
export class StartupModule {}
