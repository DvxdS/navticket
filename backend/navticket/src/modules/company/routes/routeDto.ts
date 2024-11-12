import { IsString, IsInt, IsNumber, IsNotEmpty, IsTimeString } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsTimeString()
  departureTime: string;

  @IsTimeString()
  arrivalTime: string;

  @IsInt()
  @IsNotEmpty()
  availableSeats: number;

  @IsInt()
  @IsNotEmpty()
  companyId: number;  // This will represent the ID of the associated company
}