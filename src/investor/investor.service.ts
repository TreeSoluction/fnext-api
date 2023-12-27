import { Injectable } from "@nestjs/common";
import { createInvestorDTO } from "../dto/createInvestorDTO";
import { PrismaClient } from "@prisma/client";
import { UserService } from "src/user/user.service";
import { createUserDTO } from "src/dto/createUserDTO";
import { ERegisterOperation } from "src/enums/operationsResults/ERegisterOperation";

@Injectable()
export class InvestorService {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly userService: UserService
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

      return investorRegister;
    } catch (exception) {
      return exception;
    }
  }
}
