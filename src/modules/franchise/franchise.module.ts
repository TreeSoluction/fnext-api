import { Module } from "@nestjs/common";
import { FranchiseController } from "./franchise.controller";
import { FranchiseService } from "./franchise.service";
import { PrismaClient } from "@prisma/client";

@Module({
  controllers: [FranchiseController],
  providers: [FranchiseService, PrismaClient],
})
export class FranchiseModule {}
