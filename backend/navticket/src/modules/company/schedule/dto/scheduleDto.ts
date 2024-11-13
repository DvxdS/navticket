import { IsNumber, IsString } from "class-validator";

export class CreateScheduleDto{
    @IsNumber()
    routeId: number; 
    @IsNumber()
    busTypeId: number;

    @IsString()
    departureTime: string;

    @IsString()
    arrivalTime: string;
    
}