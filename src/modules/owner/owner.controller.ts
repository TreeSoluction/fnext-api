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
  UseGuards,
} from "@nestjs/common";
import IController from "src/domain/interfaces/IController";
import { FenextResponse } from "src/domain/responses/fenextResponse";
import { OwnerService } from "./owner.service";
import { CreateOwnerDTO } from "./dto/CreateOwnerDTO";
import { IsAuth } from "src/guards/IsAuth.guard";

@Controller("owner")
export class OwnerController implements IController {
  constructor(private readonly service: OwnerService) {}

  getById(id: string): Promise<FenextResponse> {
    throw new Error("Method not implemented.");
  }

  @Post()
  @HttpCode(200)
  async register(@Body() dto: CreateOwnerDTO): Promise<FenextResponse> {
    const result = await this.service.create(dto);

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
    const result = await this.service.getAll(page, countPerPage);
    return result;
  }

  @Get(":id")
  @HttpCode(200)
  async getDataById(@Param("id") id: string) {
    const result = await this.service.get(id);

    if (result.messages.length > 0) {
      throw new NotFoundException(result);
    }

    return result;
  }

  @Delete(":id")
  @HttpCode(200)
  async delete(@Param("id") id: string) {
    const result = await this.service.deactive(id);

    if (result.messages.length > 0) {
      throw new NotFoundException(result);
    }

    return result;
  }
}
