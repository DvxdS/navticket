import { CreateScheduleDto } from "./scheduleDto";
import { PartialType } from '@nestjs/mapped-types';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto){}