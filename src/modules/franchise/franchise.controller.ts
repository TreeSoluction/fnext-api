import {
  Body,
  Controller,
  HttpCode,
  Post,
  BadRequestException,
  Delete,
  NotFoundException,
  Param,
  Get,
  UseGuards,
} from "@nestjs/common";
import { FranchiseService } from "./franchise.service";
import IController from "src/domain/interfaces/IController";
import { FenextResponse } from "src/domain/responses/fenextResponse";
import { CreateFranchiseDTO } from "src/modules/franchise/dto/CreateFranchiseDTO";
import { IsAuth } from "src/guards/IsAuth.guard";

@Controller("franchise")
export class FranchiseController implements IController {
  constructor(private readonly service: FranchiseService) {}

  @Get(":id")
  @HttpCode(200)
  async getById(@Param("id") id: string) {
    const result = await this.service.get(id);

    if (result.messages.length > 0) {
      throw new NotFoundException(result);
    }

    return result;
  }

  @Get()
  @HttpCode(200)
  async getAll(page?: number, countPerPage?: number): Promise<FenextResponse> {
    const result = await this.service.getAll(page, countPerPage);

    if (result.messages.length > 0) {
      throw new BadRequestException(result);
    }

    return result;
  }

  @Delete()
  @HttpCode(200)
  async delete(id: string): Promise<FenextResponse> {
    const result = await this.service.deactive(id);

    if (result.messages.length > 0) {
      throw new BadRequestException(result);
    }

    return result;
  }

  @Post()
  @HttpCode(200)
  async register(@Body() dto: CreateFranchiseDTO) {
    const result = await this.service.create(dto);

    if (result.messages.length > 0) {
      throw new BadRequestException(result);
    }

    return result;
  }
}
