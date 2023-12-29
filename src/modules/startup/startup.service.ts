import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { createInvestorDTO } from "src/dto/create/createInvestorDTO";
import { createStartupDTO } from "src/dto/create/createStartupDTO";
import { createUserDTO } from "src/dto/create/createUserDTO";
import { ERegisterOperation } from "src/enums/operationsResults/ERegisterOperation";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class StartupService {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly userService: UserService
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

      return startupRegister;
    } catch (exception) {
      return exception;
    }
  }
}
