import { Body, Controller, Post, HttpCode } from "@nestjs/common";
import { OwnerService } from "./owner.service";
import { createOwnerDTO } from "./dto/createOwnerDTO";

@Controller("owner")
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  @HttpCode(201)
  async register(@Body() createOwnerDto: createOwnerDTO) {
    await this.ownerService.register(createOwnerDto);
    return;
  }
}
