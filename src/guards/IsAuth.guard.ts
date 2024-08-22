import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { log } from "console";
import { AuthService } from "src/modules/auth/auth.service";

@Injectable()
export class IsAuth implements CanActivate {
  constructor(public service: AuthService) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    if (!req.headers["authorization"]) {
      console.log("INvalido");
      return false;
    }

    if (this.service.verifyToken(req.headers["authorization"])) {
      console.log("Valido");
      return true;
    }

    return false;
  }
}
