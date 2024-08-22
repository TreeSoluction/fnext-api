import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaClient } from "@prisma/client";
import { IsAuth } from "src/guards/IsAuth.guard";

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaClient, IsAuth],
  exports: [IsAuth],
})
export class AuthModule {}
