import { IsNotEmpty } from "class-validator";

export class RegisterBusinessDataDTO {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  minimumInvestment: number;
  @IsNotEmpty()
  returnValue: number;
  @IsNotEmpty()
  monthlyBilling: number;
  @IsNotEmpty()
  brazilUnits: number;
  @IsNotEmpty()
  royalty: number;
  @IsNotEmpty()
  companyHeadquarters: string;
  @IsNotEmpty()
  observationNotes: string;
  @IsNotEmpty()
  modelBusiness: string;
  @IsNotEmpty()
  capitalOfInstalation: number;
  @IsNotEmpty()
  franchiseFee: number;
  @IsNotEmpty()
  workingCapital: number;
}
