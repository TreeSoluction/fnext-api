import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsJSON,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

class BusinessDTO {
  @IsNotEmpty()
  @IsString()
  sector: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  logo: string;
  @IsNotEmpty()
  @IsJSON()
  images: object;
  @IsNotEmpty()
  @IsJSON()
  videos: object;
  @IsNotEmpty()
  @IsString()
  site: string;
  @IsNotEmpty()
  @IsNumber()
  average_monthly_billing: number;
  @IsNotEmpty()
  @IsInt()
  units_in_brazil: number;
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

class ModelDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  capital_for_instalation: number;

  @IsNotEmpty()
  @IsBoolean()
  capital_for_instalation_isFixed: boolean;

  @IsNotEmpty()
  @IsNumber()
  working_capital: number;

  @IsNotEmpty()
  @IsBoolean()
  working_capital_isFixed: boolean;

  @IsNotEmpty()
  @IsNumber()
  franchise_fee: number;

  @IsNotEmpty()
  @IsBoolean()
  franchise_fee_isFixed: boolean;

  @IsNotEmpty()
  @IsNumber()
  marketing_fee: number;

  @IsNotEmpty()
  @IsBoolean()
  marketing_fee_isFixed: boolean;

  @IsNotEmpty()
  @IsBoolean()
  has_store_area: boolean;

  @IsNumber()
  @IsOptional()
  store_area_min?: number;

  @IsNumber()
  @IsOptional()
  store_area_max?: number;

  @IsNotEmpty()
  @IsNumber()
  royalties: number;

  @IsNotEmpty()
  @IsNumber()
  royalties_isFixed: number;
}

export class CreateFranchiseDTO {
  @IsNotEmpty()
  @IsString()
  ownerID: string;

  @IsNotEmpty()
  @Type(() => BusinessDTO)
  Business: BusinessDTO;

  @IsNotEmpty()
  @IsArray()
  @Type(() => ModelDTO)
  Models: ModelDTO[];
}
