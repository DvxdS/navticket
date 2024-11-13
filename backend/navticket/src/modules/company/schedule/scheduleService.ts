import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Routes } from "../routes/routeEntity";
import { BusType } from "../bus/busEntity";
import { Schedule } from "./scheduleEntity";
import { CreateScheduleDto } from "./dto/scheduleDto";
import { UpdateScheduleDto } from "./dto/updateScheduleDto";

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,

    @InjectRepository(Routes)
    private routeRepository: Repository<Routes>,

    @InjectRepository(BusType)
    private busTypeRepository: Repository<BusType>,
  ) {}

  // Method to create a new schedule
  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const { routeId, busTypeId, departureTime, arrivalTime} = createScheduleDto;

    // Find the route and bus type based on their IDs
    const route = await this.routeRepository.findOne({ where: { id: routeId } });
    const busType = await this.busTypeRepository.findOne({ where: { id: busTypeId } });

    if (!route) throw new NotFoundException(`Route with ID ${routeId} not found`);
    if (!busType) throw new NotFoundException(`Bus type with ID ${busTypeId} not found`);

    // Create and save the new schedule
    const schedule = this.scheduleRepository.create({
      route,
      busType,
      departureTime,
      arrivalTime,
      
    });
    return await this.scheduleRepository.save(schedule);
  }

  // Method to get all schedules
  async findAll(): Promise<Schedule[]> {
    return await this.scheduleRepository.find();
  }

  // Method to get a schedule by ID
  async findOne(id: number): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne({ where: { id } });
    if (!schedule) throw new NotFoundException(`Schedule with ID ${id} not found`);
    return schedule;
  }

  // Method to update a schedule
  async update(id: number, updateScheduleDto: UpdateScheduleDto): Promise<Schedule> {
    const schedule = await this.findOne(id); // Reuse findOne to throw NotFoundException if not found
    Object.assign(schedule, updateScheduleDto);
    return await this.scheduleRepository.save(schedule);
  }

  // Method to delete a schedule
  async remove(id: number): Promise<void> {
    const result = await this.scheduleRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Schedule with ID ${id} not found`);
  }
}