import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  Param,
  Query,
  BadRequestException,
  NotFoundException,
  Delete,
  Put,
  Headers,
  Patch,
  Header,
  Req,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import IController from "src/domain/interfaces/IController";
import { CreateUserDTO } from "./dto/CreateUserDTO";
import { FenextResponse } from "src/domain/responses/fenextResponse";
import { UpdateUserDTO } from "./dto/UpdateUserDTO";
import IUserController from "src/domain/interfaces/IUserController";
import * as jwt from "jsonwebtoken";
import { IsAuth } from "src/guards/IsAuth.guard";

@Controller("user")
export class UserController implements IController, IUserController {
  constructor(private readonly userService: UserService) {}

  @Post("favorite/:id")
  @HttpCode(200)
  async setFavoriteFranchise(
    @Param("id") id: string,
    @Headers() headers: any
  ): Promise<FenextResponse> {
    const userEmail = JSON.stringify(
      jwt.decode(headers.authorization.split(" ")[1])
    );

    const json = JSON.parse(userEmail);
    const result = await this.userService.setFavoriteFranchise(id, json.email);
    if (result.messages.length > 0) {
      throw new BadRequestException(result);
    }
    return result;
  }

  @Delete()
  @HttpCode(200)
  async deleteFavoriteFranchises(
    @Param("id") id: string
  ): Promise<FenextResponse> {
    const result = await this.userService.deleteFavoriteFranchise(id);
    if (result.messages.length > 0) {
      throw new BadRequestException(result);
    }
    return;
  }

  @Get("favorite")
  @HttpCode(200)
  async listFavoriteFranchises(): Promise<FenextResponse> {
    const result = await this.userService.listFavoriteFranchise();
    if (result.messages.length > 0) {
      throw new BadRequestException(result);
    }
    return result;
  }

  @Post()
  @HttpCode(200)
  async register(@Body() dto: CreateUserDTO): Promise<FenextResponse> {
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

  @Put()
  @HttpCode(200)
  async update(@Body() dto: UpdateUserDTO): Promise<FenextResponse> {
    const result = await this.userService.update(dto);
    return result;
  }

  @Get(":id")
  @HttpCode(200)
  async getById(@Param("id") id: string) {
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
