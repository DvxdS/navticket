import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { BusTypeService } from '../busService';
import { CreateBusTypeDto } from './busDto';
import { UpdateBusTypeDto } from './busUpdateDto';

@Controller('bus-types')
export class BusTypeController {
  constructor(private readonly busTypeService: BusTypeService) {}

  @Post()
  async create(@Body() createBusTypeDto: CreateBusTypeDto) {
    return this.busTypeService.create(createBusTypeDto);
  }

  @Get()
  async findAll() {
    return this.busTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.busTypeService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBusTypeDto: UpdateBusTypeDto) {
    return this.busTypeService.update(id, updateBusTypeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.busTypeService.remove(id);
  }
}
