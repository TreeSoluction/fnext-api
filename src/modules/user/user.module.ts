import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { PrismaClient } from "@prisma/client";
import { UserController } from "./user.controller";
import { AuthService } from "../auth/auth.service";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaClient, AuthService, AuthService],
})
export class UserModule {}
