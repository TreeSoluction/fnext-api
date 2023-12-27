import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { createUserDTO } from "src/dto/createUserDTO";
import { ERegisterOperation } from "src/enums/operationsResults/ERegisterOperation";
import criptografy from "src/helper/criptografy";

@Injectable()
export class UserService {
  constructor(private readonly prismaClient: PrismaClient) {}

  async create(dto: createUserDTO): Promise<any> {
    try {
      const passwordManager = new criptografy();
      const InvestorRegisterResult = await this.prismaClient.user.create({
        data: {
          email: dto.email,
          password: await passwordManager.hashPassword(dto.password),
        },
      });
      return InvestorRegisterResult;
    } catch (exception) {
      if (exception.code === "P2002")
        return ERegisterOperation.EMAIL_ALREADY_TAKEN;
    }
  }
}
