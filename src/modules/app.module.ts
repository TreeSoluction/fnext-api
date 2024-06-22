import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { FranchiseModule } from "./franchise/franchise.module";
import { OwnerModule } from "./owner/owner.module";
import { PaymentModule } from "./payment/payment.module";
import { StatusController } from "./status/status.controller";
import { StatusModule } from "./status/status.module";

@Module({
  imports: [
    UserModule,
    AuthModule,
    FranchiseModule,
    OwnerModule,
    PaymentModule,
    StatusModule,
  ],
})
export class AppModule {}
