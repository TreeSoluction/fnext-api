import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { OwnerController } from "./owner.controller";
import { OwnerService } from "./owner.service";
import { AuthService } from "../auth/auth.service";

@Module({
  controllers: [OwnerController],
  providers: [OwnerService, PrismaClient, AuthService],
})
export class OwnerModule {}
