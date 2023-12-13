import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { OwnerService } from "./owner.service";
import { createOwnerDTO } from "./dto/createOwnerDTO";

@Controller("owner")
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  @HttpCode(201)
  async register(@Body() createOwnerDto: createOwnerDTO) {
    const result = await this.ownerService.register(createOwnerDto);
    if (result === false) {
      throw new HttpException("Email already in use", HttpStatus.CONFLICT);
    }
    return;
  }
}
