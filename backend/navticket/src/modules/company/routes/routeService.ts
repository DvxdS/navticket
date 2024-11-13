import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Routes } from './routeEntity';
import { CreateRouteDto } from './dto/routeDto'
import { Company } from '../companies/companyEntity';
import { UpdateRoutesDto } from './dto/updateRouteDto';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Routes)
    private readonly routeRepository: Repository<Routes>,
    
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  // Method to create a new route
  async createRoute(createRouteDto: CreateRouteDto): Promise<Routes> {
    const { origin, destination, price, distance, availableSeats, companyId } = createRouteDto;

    // Find the company by ID
    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    // Create a new route
    const route = this.routeRepository.create({
      origin,
      destination,
      price,
      distance,
      availableSeats,
      company,
    });

    // Save the route to the database
    return await this.routeRepository.save(route);
  }

  // Method to get a single route by ID
  async getRouteById(id: number): Promise<Routes> {
    const route = await this.routeRepository.findOne({ where: { id }, relations: ['company'] });
    if (!route) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }
    return route;
  }

  // Method to get all routes
  async getAllRoutes(): Promise<Routes[]> {
    return await this.routeRepository.find({ relations: ['company'] });
  }

  // Method to update a route by ID
  async updateRoute(id: number, updateRouteDto: UpdateRoutesDto): Promise<Routes> {
    const route = await this.getRouteById(id);
    if (!route) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }

    // Merge the updates into the existing route object
    Object.assign(route, updateRouteDto);

    // Save the updated route
    return await this.routeRepository.save(route);
  }

  // Method to delete a route by ID
  async deleteRoute(id: number): Promise<void> {
    const result = await this.routeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }
  }
}