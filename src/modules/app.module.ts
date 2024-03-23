import { Module } from "@nestjs/common";
import { InvestorModule } from "./investor/investor.module";
import { StartupModule } from "./startup/startup.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { PaymentModule } from "./payment/payment.module";

@Module({
  imports: [
    InvestorModule,
    StartupModule,
    UserModule,
    AuthModule,
    PaymentModule,
  ],
})
export class AppModule {}
