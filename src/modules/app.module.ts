import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { FranchiseModule } from "./franchise/franchise.module";
import { OwnerModule } from "./owner/owner.module";

@Module({
  imports: [UserModule, AuthModule, FranchiseModule, OwnerModule],
})
export class AppModule {}
