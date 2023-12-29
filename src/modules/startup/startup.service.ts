import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { createInvestorDTO } from "src/dto/create/createInvestorDTO";
import { createStartupDTO } from "src/dto/create/createStartupDTO";
import { createUserDTO } from "src/dto/create/createUserDTO";
import { SendConfirmationEmailDTO } from "src/dto/email/sendConfirmationEmailDTO";
import { ERegisterOperation } from "src/enums/operationsResults/ERegisterOperation";
import { UserService } from "src/modules/user/user.service";
import { EmailService } from "src/services/email/email.service";

@Injectable()
export class StartupService {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly userService: UserService,
    private readonly emailService: EmailService
  ) {}

  async register(dto: createStartupDTO): Promise<any> {
    try {
      const cnpjVerification = await this.prismaClient.startup.findFirst({
        where: { cnpj: dto.cnpj },
      });

      if (cnpjVerification) {
        return ERegisterOperation.CNPJ_ALREADY_TAKEN;
      }

      const userRegister = await this.userService.create(
        new createUserDTO(dto.email, dto.password)
      );

      if (userRegister === ERegisterOperation.EMAIL_ALREADY_TAKEN) {
        return ERegisterOperation.EMAIL_ALREADY_TAKEN;
      }

      const startupRegister = await this.prismaClient.startup.create({
        data: {
          name: dto.name.toUpperCase(),
          phone: dto.phone.replace(/\s/g, ""),
          birth_date: new Date(dto.birth_date),
          cnpj: dto.cnpj.replace(/\s/g, ""),
          userId: userRegister.id,
        },
      });

      const confirmationCodeResult =
        await this.prismaClient.confirmationCode.findUnique({
          where: {
            id: userRegister.confirmationCodeId,
          },
        });

      await this.emailService.SendEmail(
        new SendConfirmationEmailDTO(
          dto.email,
          "fenext2023@gmail.com",
          confirmationCodeResult.code,
          dto.name
        )
      );

      return startupRegister;
    } catch (exception) {
      return exception;
    }
  }
}
