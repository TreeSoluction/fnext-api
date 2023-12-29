import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaClient } from "@prisma/client";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaClient],
})
export class UserModule {}
