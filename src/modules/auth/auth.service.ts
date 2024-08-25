import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { EOperations } from "src/enums/operationsResults/EOperations";
import criptografy from "src/helper/criptografy";
import { loginDTO } from "./dto/loginDTO";

@Injectable()
export class AuthService {
  private secretKey: string;

  constructor(private readonly prismaClient: PrismaClient) {
    this.secretKey = process.env.SECRET;
  }

  async signIn(dto: loginDTO): Promise<any> {
    try {
      const userSearchResult = await this.prismaClient.user.findUniqueOrThrow({
        where: {
          email: dto.email.toUpperCase(),
        },
        include: {
          Owner: true,
        },
      });

      const passwordManager = new criptografy();
      const passwordVerification = await passwordManager.comparePasswords(
        dto.password,
        userSearchResult.password
      );

      if (!passwordVerification) {
        return EOperations.FAIL;
      } else {
        const token = this.generateToken({ email: dto.email });
        const response = {
          token: token,
          name: userSearchResult.name,
          email: userSearchResult.email,
          id: userSearchResult.id,
          owner: userSearchResult.Owner,
        };
        return response;
      }
    } catch (err) {
      if (err.code === "P2025") {
        return EOperations.NOT_FOUND;
      } else {
        return EOperations.FAIL;
      }
    }
  }

  public verifyToken(token: string): boolean {
    try {
      jwt.verify(token.split(" ")[1], this.secretKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  public generateToken(payload: any): string {
    try {
      const token = jwt.sign(payload, this.secretKey, { expiresIn: "1h" });
      return token;
    } catch (error) {}
  }
}
