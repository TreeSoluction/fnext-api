import { Module } from "@nestjs/common";
import { InvestorModule } from "./investor/investor.module";
import { StartupModule } from "./startup/startup.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [InvestorModule, StartupModule, UserModule],
})
export class AppModule {}
