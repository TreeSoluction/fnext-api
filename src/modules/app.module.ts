import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { FranchiseModule } from "./franchise/franchise.module";
import { OwnerModule } from "./owner/owner.module";
import { StatusController } from "./status/status.controller";
import { StatusModule } from "./status/status.module";

@Module({
  imports: [UserModule, AuthModule, FranchiseModule, OwnerModule, StatusModule],
})
export class AppModule {}
