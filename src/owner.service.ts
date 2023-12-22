import { Injectable } from "@nestjs/common";
import { createOwnerDTO } from "./dto/createOwnerDTO";
import { PrismaClient } from "@prisma/client";
import { SendConfirmationEmail } from "./services/email";

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

  generateRandomString(): string {
    const getRandomNumber = (): number => Math.floor(Math.random() * 10);

    const randomNumbers: number[] = Array.from({ length: 4 }, getRandomNumber);
    const randomString: string = randomNumbers.join("");

    return randomString;
  }
}
