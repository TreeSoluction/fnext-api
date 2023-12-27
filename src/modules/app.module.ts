import { Module } from "@nestjs/common";
import { InvestorModule } from "./investor/investor.module";
import { StartupModule } from "./startup/startup.module";

@Module({
  imports: [InvestorModule, StartupModule],
})
export class AppModule {}
