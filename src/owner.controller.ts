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
import { verifyAccountDTO } from "./dto/verifyAccountDTO";
import { EOperations } from "./EOperations/EOperations";

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

  @Post("/verifyemail")
  @HttpCode(200)
  async confirmEmail(@Body() verifyAccountDto: verifyAccountDTO) {
    const result = await this.ownerService.verifyAccount(verifyAccountDto);
    if (result === EOperations.NOT_FOUND) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    if (result === EOperations.FAIL) {
      throw new HttpException("Code incorrect", HttpStatus.CONFLICT);
    }
    return;
  }
}
