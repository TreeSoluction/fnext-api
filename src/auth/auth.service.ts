import { Injectable } from "@nestjs/common";
import { loginDTO } from "src/dto/loginDTO";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { EOperations } from "src/EOperations/EOperations";
import criptografy from "src/services/criptografy";

@Injectable()
export class AuthService {
  private secretKey: string;

  constructor(private readonly prismaClient: PrismaClient) {
    this.secretKey = process.env.SECRET;
  }

  async signIn(dto: loginDTO): Promise<any> {
    try {
      const ownerSearchResult = await this.prismaClient.owner.findUniqueOrThrow(
        {
          where: {
            email: dto.email,
          },
        }
      );

      const passwordManager = new criptografy();
      const passwordVerification = await passwordManager.comparePasswords(
        dto.password,
        ownerSearchResult.password
      );
      if (!passwordVerification) {
        return EOperations.FAIL;
      } else {
        const token = this.generateToken({ email: dto.email });
        const response = {
          token: token,
          name: ownerSearchResult.name,
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

  public verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  public generateToken(payload: any): string {
    const token = jwt.sign(payload, this.secretKey, { expiresIn: "1h" });
    return token;
  }
}
