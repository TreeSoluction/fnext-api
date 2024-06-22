import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller("status")
export class StatusController {
  @Get()
  @HttpCode(200)
  status(): any {
    return "API ONLINE";
  }
}
