import { IsString, IsInt, IsNumber, IsNotEmpty, isNumber,   } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsNumber()
  @IsNotEmpty()
  priceStandard: number;

  @IsNumber()
  priceVIP : number;

  @IsNumber()
  @IsNotEmpty()
  distance : number;
  

  @IsInt()
  @IsNotEmpty()
  companyId: string;  // This will represent the ID of the associated company
}