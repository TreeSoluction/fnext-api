import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { PaymentModule } from "./payment/payment.module";

@Module({
  imports: [UserModule, AuthModule, PaymentModule],
})
export class AppModule {}
