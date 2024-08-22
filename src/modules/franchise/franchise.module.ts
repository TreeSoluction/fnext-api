import { Module } from "@nestjs/common";
import { FranchiseController } from "./franchise.controller";
import { FranchiseService } from "./franchise.service";
import { PrismaClient } from "@prisma/client";
import { IsAuth } from "src/guards/IsAuth.guard";
import { AuthService } from "../auth/auth.service";

@Module({
  controllers: [FranchiseController],
  providers: [FranchiseService, PrismaClient, AuthService, IsAuth],
})
export class FranchiseModule {}
