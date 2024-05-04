import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateFranchiseDTO } from "src/domain/interfaces/dto/commands/franchise/CreateFranchiseDTO";
import { FenextMessage } from "src/domain/interfaces/dto/responses/fenextMessage";
import { FenextResponse } from "src/domain/interfaces/dto/responses/fenextResponse";
import { EOperations } from "src/enums/operationsResults/EOperations";
import criptografy from "src/helper/criptografy";

@Injectable()
export class FranchiseService {
  constructor(private readonly prismaClient: PrismaClient) {}

  async create(dto: CreateFranchiseDTO): Promise<FenextResponse> {
    try {
      if()

      

    } catch (exception) {}
  }

  async get(id: string): Promise<FenextResponse> {
    try {
      const userSearchResult = await this.prismaClient.user.findUniqueOrThrow({
        where: {
          id: id,
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });
      return new FenextResponse(new Array<FenextMessage>(), userSearchResult);
    } catch (exception) {
      let messages = new Array<FenextMessage>();

      if (exception.code === "P2016") {
        messages.push(
          new FenextMessage(EOperations.NOT_FOUND, "This user not found")
        );
      }

      return new FenextResponse(messages, null);
    }
  }

  async getAll(page: number, countPerPage: number): Promise<FenextResponse> {
    try {
      const userSearchResult = await this.prismaClient.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
        },
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
      const passwordManager = new criptografy();

      const userDeactiveResult = await this.prismaClient.user.update({
        data: {
          deleted: true,
        },
        where: {
          id: id,
        },
      });

      return new FenextResponse(new Array<FenextMessage>(), userDeactiveResult);
    } catch (exception) {
      let messages = new Array<FenextMessage>();

      if (exception.code === "P2016") {
        messages.push(
          new FenextMessage(EOperations.NOT_FOUND, "This user not found")
        );
      }

      return new FenextResponse(messages, null);
    }
  }
}
