import { Module } from "@nestjs/common";
import { FranchiseController } from "./franchise.controller";
import { FranchiseService } from "./franchise.service";
import { PrismaClient } from "@prisma/client";
import { IsAuth } from "src/guards/IsAuth.guard";
import { AuthService } from "../auth/auth.service";
import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
  controllers: [FranchiseController],
  imports: [CacheModule.register()],
  providers: [
    FranchiseService,
    PrismaClient,
    AuthService,
    IsAuth,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class FranchiseModule {}
