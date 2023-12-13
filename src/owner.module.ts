import { Module } from "@nestjs/common";
import { OwnerController } from "./owner.controller";
import { OwnerService } from "./owner.service";
import { PrismaClient } from "@prisma/client";

@Module({
  imports: [],
  controllers: [OwnerController],
  providers: [OwnerService, PrismaClient],
})
export class OwnerModule {}
