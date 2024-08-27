import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { FranchiseModule } from "./franchise/franchise.module";
import { OwnerModule } from "./owner/owner.module";
import { StatusModule } from "./status/status.module";
import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
  imports: [
    CacheModule.register({
      ttl: 1,
      max: 100,
      store: "memory",
    }),
    UserModule,
    AuthModule,
    FranchiseModule,
    OwnerModule,
    StatusModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
