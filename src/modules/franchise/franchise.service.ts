import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateFranchiseDTO } from "src/modules/franchise/dto/CreateFranchiseDTO";
import { FenextMessage } from "src/domain/responses/fenextMessage";
import { FenextResponse } from "src/domain/responses/fenextResponse";
import { EOperations } from "src/enums/operationsResults/EOperations";

@Injectable()
export class FranchiseService {
  constructor(private readonly prismaClient: PrismaClient) {}

  async create(dto: CreateFranchiseDTO): Promise<FenextResponse> {
    try {
      const result = await this.prismaClient.business.create({
        data: {
          ...dto.Business,
          Owner: { connect: { id: dto.ownerID } },
          Models: {
            create: dto.Models,
          },
        },
        include: { Models: true },
      });

      return new FenextResponse(new Array<FenextMessage>(), result);
    } catch (exception) {
      let messages = new Array<FenextMessage>();

      console.log(exception);

      if (exception.code === "P2016") {
        messages.push(
          new FenextMessage(EOperations.NOT_FOUND, "This owner not found")
        );
      }

      return new FenextResponse(messages, null);
    }
  }

  async get(id: string): Promise<FenextResponse> {
    try {
      const userSearchResult =
        await this.prismaClient.business.findUniqueOrThrow({
          where: {
            id: id,
          },
          include: { Models: true },
        });
      return new FenextResponse(new Array<FenextMessage>(), userSearchResult);
    } catch (exception) {
      let messages = new Array<FenextMessage>();

      if (exception.code === "P2016") {
        messages.push(
          new FenextMessage(EOperations.NOT_FOUND, "This business not found")
        );
      }

      return new FenextResponse(messages, null);
    }
  }

  async getAll(page: number, countPerPage: number): Promise<FenextResponse> {
    try {
      const userSearchResult = await this.prismaClient.business.findMany({
        skip: countPerPage * page || 0,
        take: countPerPage || undefined,
      });

      return new FenextResponse(new Array<FenextMessage>(), userSearchResult);
    } catch (exception) {
      let messages = new Array<FenextMessage>();
      return new FenextResponse(messages, null);
    }
  }

  async deactive(id: string): Promise<FenextResponse> {
    try {
      const result = await this.prismaClient.business.update({
        data: {
          deleted: true,
        },
        where: {
          id: id,
        },
      });

      return new FenextResponse(new Array<FenextMessage>(), result);
    } catch (exception) {
      let messages = new Array<FenextMessage>();

      if (exception.code === "P2016") {
        messages.push(
          new FenextMessage(EOperations.NOT_FOUND, "This business not found")
        );
      }

      return new FenextResponse(messages, null);
    }
  }
}
