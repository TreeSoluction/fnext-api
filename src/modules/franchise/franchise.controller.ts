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
  Query,
  Inject,
  UseInterceptors,
} from "@nestjs/common";
import { FranchiseService } from "./franchise.service";
import IController from "src/domain/interfaces/IController";
import { FenextResponse } from "src/domain/responses/fenextResponse";
import { CreateFranchiseDTO } from "src/modules/franchise/dto/CreateFranchiseDTO";
import { Cache, CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";

@Controller("franchise")
export class FranchiseController implements IController {
  constructor(
    private readonly service: FranchiseService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

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
  @UseInterceptors(CacheInterceptor)
  async getAll(
    @Query("page")
    page?: number,
    @Query("countPerPage")
    countPerPage?: number,
    @Query("category")
    category?: string
  ): Promise<FenextResponse> {
    console.log(`FRANCHISE LOADING ${page} ${countPerPage}`);
    const result = await this.service.getAll(page, countPerPage, category);

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
