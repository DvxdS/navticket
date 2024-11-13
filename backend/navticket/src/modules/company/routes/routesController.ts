import { Controller, Post, Get, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { RouteService } from './routeService';
import { CreateRouteDto } from './dto/routeDto';
import { UpdateRoutesDto } from './dto/updateRouteDto';
import { Routes } from './routeEntity';


@Controller('routes')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  // Endpoint to create a new route
  @Post()
  async createRoute(@Body() createRouteDto: CreateRouteDto): Promise<Routes> {
    return this.routeService.createRoute(createRouteDto);
  }

  // Endpoint to get a route by ID
  @Get(':id')
  async getRouteById(@Param('id', ParseIntPipe) id: number): Promise<Routes> {
    return this.routeService.getRouteById(id);
  }

  // Endpoint to get all routes
  @Get()
  async getAllRoutes(): Promise<Routes[]> {
    return this.routeService.getAllRoutes();
  }

  // Endpoint to update a route by ID
  @Patch(':id')
  async updateRoute(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRouteDto: UpdateRoutesDto,
  ): Promise<Routes> {
    return this.routeService.updateRoute(id, updateRouteDto);
  }

  // Endpoint to delete a route by ID
  @Delete(':id')
  async deleteRoute(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.routeService.deleteRoute(id);
  }
}