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

      await this.prismaClient.owner.create({
        data: {
          name: dto.fullName.toUpperCase(),
          phone: dto.phone,
          User: { connect: { id: userRegisterResult.id } },
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
        include: {
          Owner: true,
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

  // async setFavoriteFranchise(id: string, email: string) {
  //   try {
  //     await this.prismaClient.business.findUniqueOrThrow({
  //       where: {
  //         id: id,
  //       },
  //     });

  //     const userSearch = await this.prismaClient.user.findUniqueOrThrow({
  //       where: {
  //         email: email.toUpperCase(),
  //       },
  //     });

  //     const setFavoriteResult =
  //       await this.prismaClient.favoriteFranchises.create({
  //         data: {
  //           userId: userSearch.id,
  //           businessId: id,
  //         },
  //       });

  //     return new FenextResponse(new Array<FenextMessage>(), setFavoriteResult);
  //   } catch (exception) {
  //     let messages = new Array<FenextMessage>();

  //     if (exception.code === "P2025") {
  //       messages.push(
  //         new FenextMessage(
  //           EOperations.NOT_FOUND,
  //           "This user or business not found"
  //         )
  //       );
  //     } else {
  //       messages.push(new FenextMessage(EOperations.FAIL, "Unhandle error"));
  //     }

  //     return new FenextResponse(messages, null);
  //   }
  // }

  // async deleteFavoriteFranchise(id: string) {
  //   try {
  //     await this.prismaClient.user.delete({
  //       where: {
  //         id: id,
  //       },
  //     });

  //     return new FenextResponse(new Array<FenextMessage>(), null);
  //   } catch (exception) {
  //     let messages = new Array<FenextMessage>();

  //     if (exception.code === "P2016") {
  //       messages.push(
  //         new FenextMessage(EOperations.NOT_FOUND, "This user not found")
  //       );
  //     }
  //   }
  // }

  // async listFavoriteFranchise() {
  //   try {
  //     const favoritesFranchises =
  //       await this.prismaClient.favoriteFranchises.findMany();
  //     return new FenextResponse(
  //       new Array<FenextMessage>(),
  //       favoritesFranchises
  //     );
  //   } catch (exception) {
  //     let messages = new Array<FenextMessage>();

  //     if (exception.code === "P2016") {
  //       messages.push(
  //         new FenextMessage(EOperations.NOT_FOUND, "This user not found")
  //       );
  //     }

  //     return new FenextResponse(messages, null);
  //   }
  // }
}
