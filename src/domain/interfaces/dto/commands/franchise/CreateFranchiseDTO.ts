import { IsNotEmpty } from "class-validator";

export class CreateFranchiseDTO extends Dto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  franchise_logo_url: string;
  @IsNotEmpty()
  franchise_name: string;
  @IsNotEmpty()
  franchise_images: string[];
  @IsNotEmpty()
  franchise_videos: string[];
  @IsNotEmpty()
  franchise_site_url: string[];

  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  product_description: string;
  @IsNotEmpty()
  minimum_investment: number;
  @IsNotEmpty()
  return_time: string;
  @IsNotEmpty()
  average_monthly_revenued: number;
  @IsNotEmpty()
  total_units_in_brazil: number;
  @IsNotEmpty()
  sector: string;

  @IsNotEmpty()
  physical_store_capital_for_installation: number;
  @IsNotEmpty()
  physical_store_working_capital: number;
  @IsNotEmpty()
  physical_store_franchise_fee: number;
  @IsNotEmpty()
  physical_store_total_units_in_brazil: number;
  @IsNotEmpty()
  physical_store_headquarters: string;
  @IsNotEmpty()
  physical_store_average_monthly_revenued: number;
  @IsNotEmpty()
  physical_store_area: number;
  @IsNotEmpty()
  physical_store_charges_royalty: boolean;
}
