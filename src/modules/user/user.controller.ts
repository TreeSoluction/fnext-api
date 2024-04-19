import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Get,
  Param,
  Query,
  BadRequestException,
  NotFoundException,
  Delete,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { VerifyAccountDTO } from "src/dto/commands/user/VerifyAccountDTO";
import { EConfirmationCodeStatus } from "src/enums/operationsResults/EConfirmationCodeStatus";
import { CreateUserDTO } from "src/dto/commands/user/CreateUserDTO";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(200)
  async register(@Body() dto: CreateUserDTO) {
    const result = await this.userService.create(dto);

    if (result.messages.length > 0) {
      throw new BadRequestException(result);
    }

    return result;
  }

  @Get()
  @HttpCode(200)
  async getAll(
    @Query("page") page?: number,
    @Query("countPerPage") countPerPage?: number
  ) {
    const result = await this.userService.getAll(page, countPerPage);
    return result;
  }

  @Get(":id")
  @HttpCode(200)
  async getDataById(@Param("id") id: string) {
    const result = await this.userService.get(id);

    if (result.messages.length > 0) {
      throw new NotFoundException(result);
    }

    return result;
  }

  @Delete(":id")
  @HttpCode(200)
  async delete(@Param("id") id: string) {
    const result = await this.userService.deactive(id);

    if (result.messages.length > 0) {
      throw new NotFoundException(result);
    }

    return result;
  }
}
