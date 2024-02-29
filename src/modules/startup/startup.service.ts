import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { userInfo } from "os";
import { createStartupDTO } from "src/dto/create/createStartupDTO";
import { createUserDTO } from "src/dto/create/createUserDTO";
import { SendConfirmationEmailDTO } from "src/dto/email/SendConfirmationEmailDTO";
import { ERegisterOperation } from "src/enums/operationsResults/ERegisterOperation";
import { UserService } from "src/modules/user/user.service";
import { EmailService } from "src/services/email/email.service";
import { RegisterBusinessDataDTO } from "src/dto/startup/RegisterBusinessDataDTO";
import { connect } from "http2";

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

      await this.emailService.sendConfirmationEmail(
        userRegister.email,
        startupRegister.name,
        confirmationCodeResult.code
      );

      return startupRegister;
    } catch (exception) {
      return exception;
    }
  }

  async registerBusinessData(dto: RegisterBusinessDataDTO): Promise<any> {
    try {
      console.log(dto);
      const startupRegister = await this.prismaClient.startup.update({
        where: { id: dto.id },
        data: {
          completeRegister: true,
          minimumInvestment: dto.minimumInvestment,
          returnValue: dto.returnValue,
          monthlyBilling: dto.monthlyBilling,
          brazilUnits: dto.brazilUnits,
          royalty: dto.royalty,
          companyHeadquarters: dto.companyHeadquarters,
          observationNotes: dto.observationNotes,
          ModelOfBusiness: {
            create: {
              name: dto.modelBusiness,
              capitalForInstallation: dto.capitalOfInstalation,
              franchiseFee: dto.franchiseFee,
              workingCapital: dto.workingCapital,
            },
          },
        },
      });

      return startupRegister;
    } catch (exception) {
      return exception;
    }
  }

  async getData(id): Promise<any> {
    try {
      const result = await this.prismaClient.startup.findUnique({
        where: { id: parseInt(id) },
      });
      return result;
    } catch (exception) {
      return exception;
    }
  }
}
