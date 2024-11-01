import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { FenextMessage } from "src/domain/responses/fenextMessage";
import { FenextResponse } from "src/domain/responses/fenextResponse";
import { EOperations } from "src/enums/operationsResults/EOperations";
import criptografy from "src/helper/criptografy";
import { CreateOwnerDTO } from "./dto/CreateOwnerDTO";

@Injectable()
export class OwnerService {
  constructor(private readonly prismaClient: PrismaClient) {}

  async verifyHaveFranchise(id: string): Promise<FenextResponse> {
    try {
      const franchise = await this.prismaClient.business.count({
        where: {
          ownerId: id,
        },
      });

      if (franchise > 0) {
        return new FenextResponse(new Array<FenextMessage>(), true);
      } else {
        return new FenextResponse(new Array<FenextMessage>(), false);
      }
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

  async get(id: string): Promise<FenextResponse> {
    try {
      const userSearchResult = await this.prismaClient.owner.findUniqueOrThrow({
        where: {
          id: id,
        },
        include: { Business: true },
      });
      return new FenextResponse(new Array<FenextMessage>(), userSearchResult);
    } catch (exception) {
      let messages = new Array<FenextMessage>();

      if (exception.code === "P2016") {
        messages.push(
          new FenextMessage(EOperations.NOT_FOUND, "This owner not found")
        );
      }

      return new FenextResponse(messages, null);
    }
  }

  async getAll(page: number, countPerPage: number): Promise<FenextResponse> {
    try {
      const userSearchResult = await this.prismaClient.owner.findMany({
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
      const result = await this.prismaClient.owner.update({
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
          new FenextMessage(EOperations.NOT_FOUND, "This owner not found")
        );
      }

      return new FenextResponse(messages, null);
    }
  }
}
