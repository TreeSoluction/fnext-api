import { Module } from "@nestjs/common";
import { StartupController } from "./startup.controller";
import { PrismaClient } from "@prisma/client";
import { StartupService } from "./startup.service";
import { UserService } from "src/user/user.service";

@Module({
  controllers: [StartupController],
  providers: [StartupService, PrismaClient, UserService],
})
export class StartupModule {}
