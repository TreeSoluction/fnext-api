import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { log } from "console";
import { AuthService } from "src/modules/auth/auth.service";

@Injectable()
export class IsAuth implements CanActivate {
  constructor(public service: AuthService) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    if (!req.headers["authorization"]) {
      return false;
    }

    if (this.service.verifyToken(req.headers["authorization"])) {
      return true;
    }

    return false;
  }
}
