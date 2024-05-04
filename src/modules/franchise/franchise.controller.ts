import {
  Body,
  Controller,
  HttpCode,
  Post,
  BadRequestException,
} from "@nestjs/common";
import { FranchiseService } from "./franchise.service";
import IController from "src/domain/interfaces/IController";
import { FenextResponse } from "src/domain/interfaces/dto/responses/fenextResponse";
import { CreateFranchiseDTO } from "src/domain/interfaces/dto/commands/franchise/CreateFranchiseDTO";

@Controller("user")
export class FranchiseController implements IController {
  constructor(private readonly service: FranchiseService) {}

  getAll(page?: number, countPerPage?: number): Promise<FenextResponse> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<FenextResponse> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<FenextResponse> {
    throw new Error("Method not implemented.");
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
