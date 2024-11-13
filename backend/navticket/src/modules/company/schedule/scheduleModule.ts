
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleService } from "./scheduleService";
import { ScheduleController } from './scheduleController';
import { Routes } from '../routes/routeEntity';
import { BusType } from '../bus/busEntity';
import { Schedule } from './scheduleEntity';

@Module({
    imports: [
      TypeOrmModule.forFeature([Schedule, Routes, BusType]),
    ],
    controllers: [ScheduleController],
    providers: [ScheduleService],
  })
  export class ScheduleModule {}