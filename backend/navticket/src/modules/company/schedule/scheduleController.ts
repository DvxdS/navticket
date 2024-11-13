import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateScheduleDto } from './dto/scheduleDto';
import { UpdateScheduleDto } from './dto/updateScheduleDto';
import { ScheduleService } from './scheduleService';
import { Schedule } from './scheduleEntity';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  // Create a new schedule
  @Post()
  async create(@Body() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return await this.scheduleService.create(createScheduleDto);
  }

  // Retrieve all schedules
  @Get()
  async findAll(): Promise<Schedule[]> {
    return await this.scheduleService.findAll();
  }

  // Retrieve a specific schedule by ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Schedule> {
    return await this.scheduleService.findOne(id);
  }

  // Update a specific schedule
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ): Promise<Schedule> {
    return await this.scheduleService.update(id, updateScheduleDto);
  }

  // Delete a specific schedule
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.scheduleService.remove(id);
  }
}