import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

class BusinessDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  logo: string;
  @IsNotEmpty()
  @IsNumber()
  average_monthly_billing: number;
  @IsNotEmpty()
  @IsInt()
  units_in_brazil: number;
  @IsNotEmpty()
  @IsString()
  site: string;
  @IsNotEmpty()
  @IsString()
  headquarters: string;
  @IsNotEmpty()
  @IsNumber()
  ROI_min: number;
  @IsNotEmpty()
  @IsNumber()
  ROI_max: number;
}

export class CreateFranchiseDTO {
  @IsNotEmpty()
  @IsString()
  ownerID: string;

  @IsNotEmpty()
  @Type(() => BusinessDTO)
  Business: BusinessDTO;
}
