import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateBusTypeDto {
  @IsString()
  type: string;

  @IsInt()
  capacity: number;

  @IsOptional()
  @IsString()
  description?: string;
}