import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { createUserDTO } from "src/dto/create/createUserDTO";
import { VerifyAccountDTO } from "src/dto/user/VerifyAccountDTO";
import { EConfirmationCodeStatus } from "src/enums/operationsResults/EConfirmationCodeStatus";
import { ERegisterOperation } from "src/enums/operationsResults/ERegisterOperation";
import criptografy from "src/helper/criptografy";

@Injectable()
export class UserService {
  constructor(private readonly prismaClient: PrismaClient) {}

  async create(dto: createUserDTO): Promise<any> {
    try {
      const passwordManager = new criptografy();

      const ConfirmatioCodeRegisterResult =
        await this.prismaClient.confirmationCode.create({
          data: {
            code: this.generateRandomFourDigits(),
          },
        });

      const UserRegisterResult = await this.prismaClient.user.create({
        data: {
          email: dto.email,
          password: await passwordManager.hashPassword(dto.password),
          confirmationCodeId: ConfirmatioCodeRegisterResult.id,
        },
      });

      return UserRegisterResult;
    } catch (exception) {
      if (exception.code === "P2002")
        return ERegisterOperation.EMAIL_ALREADY_TAKEN;
    }
  }

  async confirmAccount(
    dto: VerifyAccountDTO
  ): Promise<EConfirmationCodeStatus> {
    try {
      const UserResult = await this.prismaClient.user.findFirstOrThrow({
        where: { id: dto.userid },
      });

      if (UserResult.verify === true) {
        return EConfirmationCodeStatus.ALREADY_ACTIVE;
      }

      const ConfirmationCodeResult =
        await this.prismaClient.confirmationCode.findFirstOrThrow({
          where: { id: UserResult.confirmationCodeId },
        });

      if (ConfirmationCodeResult.creation_at.getHours() > 24) {
        return EConfirmationCodeStatus.OVERDUE;
      }

      if (ConfirmationCodeResult.code === dto.code) {
        await this.prismaClient.user.update({
          where: { id: dto.userid },
          data: {
            verify: true,
          },
        });

        const userResult = await this.prismaClient.user.findUnique({
          where: { id: dto.userid },
        });

        await this.prismaClient.confirmationCode.delete({
          where: { id: userResult.confirmationCodeId },
        });

        return EConfirmationCodeStatus.CORRECT;
      }
    } catch (exception) {
      if (exception.code === "P2016") {
        return EConfirmationCodeStatus.NOT_FOUND;
      }

      return exception;
    }
  }

  generateRandomFourDigits(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
}
