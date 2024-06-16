import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { FenextMessage } from "src/domain/responses/fenextMessage";
import { FenextResponse } from "src/domain/responses/fenextResponse";
import { EOperations } from "src/enums/operationsResults/EOperations";
import criptografy from "src/helper/criptografy";
import { CreateUserDTO } from "./dto/CreateUserDTO";
import { UpdateUserDTO } from "./dto/UpdateUserDTO";

@Injectable()
export class UserService {
  constructor(private readonly prismaClient: PrismaClient) {}

  async create(dto: CreateUserDTO): Promise<FenextResponse> {
    try {
      if (dto.password.length < 8) {
        return new FenextResponse(
          [
            new FenextMessage(
              EOperations.BAD_INPUT,
              "Password must have at least 8 characters"
            ),
          ],
          null
        );
      }

      const passwordManager = new criptografy();

      const userRegisterResult = await this.prismaClient.user.create({
        data: {
          name: dto.fullName.toUpperCase(),
          email: dto.email.toUpperCase(),
          password: await passwordManager.hashPassword(dto.password),
        },
      });

      return new FenextResponse(new Array<FenextMessage>(), {
        id: userRegisterResult.id,
        name: userRegisterResult.name,
        email: userRegisterResult.email,
      });
    } catch (exception) {
      let messages = new Array<FenextMessage>();

      if (exception.code === "P2002") {
        messages.push(
          new FenextMessage(EOperations.CONFLICT, "This email already taken")
        );
      }

      return new FenextResponse(messages, null);
    }
  }

  async update(dto: UpdateUserDTO): Promise<FenextResponse> {
    try {
      const userUpdateResult = await this.prismaClient.user.update({
        data: {
          name: dto.fullName.toUpperCase(),
          email: dto.email.toUpperCase(),
        },
        where: {
          id: dto.id,
        },
      });

      return new FenextResponse(new Array<FenextMessage>(), {
        id: userUpdateResult.id,
        name: userUpdateResult.name,
        email: userUpdateResult.email,
      });
    } catch (exception) {
      let messages = new Array<FenextMessage>();

      if (exception.code === "P2002") {
        messages.push(
          new FenextMessage(EOperations.CONFLICT, "This email already taken")
        );
      }

      return new FenextResponse(messages, null);
    }
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
