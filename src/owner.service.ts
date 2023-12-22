import { Injectable } from "@nestjs/common";
import { createOwnerDTO } from "./dto/createOwnerDTO";
import { ConfirmationCode, PrismaClient } from "@prisma/client";
import { SendConfirmationEmail } from "./services/email";
import { verifyAccountDTO } from "./dto/verifyAccountDTO";
import { EOperations } from "./EOperations/EOperations";

@Injectable()
export class OwnerService {
  constructor(private readonly prismaClient: PrismaClient) {}

  async register(dto: createOwnerDTO) {
    try {
      const ownerRegisterResult = await this.prismaClient.owner.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: dto.password,
        },
      });

      const confirmationCodeRegisterResult =
        await this.prismaClient.confirmationCode.create({
          data: {
            code: this.generateRandomString(),
            owner_id: ownerRegisterResult.id,
          },
        });

      await this.prismaClient.$disconnect();

      await SendConfirmationEmail(
        ownerRegisterResult.email,
        ownerRegisterResult.name,
        confirmationCodeRegisterResult.code
      );

      return ownerRegisterResult;
    } catch (exception) {
      if (exception.code === "P2002") {
        await this.prismaClient.$disconnect();
        return false;
      }
    }
  }

  async verifyAccount(dto: verifyAccountDTO): Promise<EOperations> {
    try {
      let confirmationCode: ConfirmationCode;
      console.log(dto);

      if (!dto.ownerid) {
        const ownerSearchResult =
          await this.prismaClient.owner.findUniqueOrThrow({
            where: { email: dto.email },
          });

        confirmationCode =
          await this.prismaClient.confirmationCode.findUniqueOrThrow({
            where: { owner_id: ownerSearchResult.id },
          });
      } else {
        confirmationCode =
          await this.prismaClient.confirmationCode.findUniqueOrThrow({
            where: { owner_id: dto.ownerid },
          });
      }

      if (confirmationCode.code === dto.code) {
        await this.prismaClient.confirmationCode.delete({
          where: { id: confirmationCode.id },
        });
      } else {
        return EOperations.FAIL;
      }

      await this.prismaClient.owner.update({
        where: { id: confirmationCode.owner_id },
        data: {
          verify: true,
        },
      });

      await this.prismaClient.$disconnect();

      return EOperations.SUCESS;
    } catch (exception) {
      await this.prismaClient.$disconnect();
      return EOperations.NOT_FOUND;
    }
  }

  generateRandomString(): string {
    const getRandomNumber = (): number => Math.floor(Math.random() * 10);

    const randomNumbers: number[] = Array.from({ length: 4 }, getRandomNumber);
    const randomString: string = randomNumbers.join("");

    return randomString;
  }
}
