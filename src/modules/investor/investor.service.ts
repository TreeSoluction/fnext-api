import { Injectable } from "@nestjs/common";
import { createInvestorDTO } from "../../dto/create/createInvestorDTO";
import { PrismaClient } from "@prisma/client";
import { UserService } from "src/modules/user/user.service";
import { createUserDTO } from "src/dto/create/createUserDTO";
import { ERegisterOperation } from "src/enums/operationsResults/ERegisterOperation";
import { EmailService } from "src/services/email/email.service";

@Injectable()
export class InvestorService {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly userService: UserService,
    private readonly emailService: EmailService
  ) {}

  async register(dto: createInvestorDTO): Promise<any> {
    try {
      const userRegister = await this.userService.create(
        new createUserDTO(dto.email, dto.password)
      );

      if (userRegister === ERegisterOperation.EMAIL_ALREADY_TAKEN) {
        return ERegisterOperation.EMAIL_ALREADY_TAKEN;
      }

      const investorRegister = await this.prismaClient.investor.create({
        data: {
          name: dto.name.toUpperCase(),
          phone: dto.phone.replace(/\s/g, ""),
          birth_date: new Date(dto.birth_date),
          userId: userRegister.id,
        },
      });

      const confirmationCodeResult =
        await this.prismaClient.confirmationCode.findUnique({
          where: {
            id: userRegister.confirmationCodeId,
          },
        });

      await this.emailService.sendConfirmationEmail(
        userRegister.email,
        investorRegister.name,
        confirmationCodeResult.code
      );

      return investorRegister;
    } catch (exception) {
      return exception;
    }
  }
}
