import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { OwnerController } from "./owner.controller";
import { OwnerService } from "./owner.service";

@Module({
  controllers: [OwnerController],
  providers: [OwnerService, PrismaClient],
})
export class OwnerModule {}
