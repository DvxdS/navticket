import { IsString, IsArray, IsOptional, IsInt, Min } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })  
  officialDocs: string[];

  @IsInt()
  @Min(0)
  numberOfBusesVip: number;

  @IsInt()
  @Min(0)
  numberOfBusesStandard: number;

  @IsOptional()
  @IsString()
  contactInfo?: string;

  @IsOptional()
  @IsString()
  officeLocation?: string;
}
