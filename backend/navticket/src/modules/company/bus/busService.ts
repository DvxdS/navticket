import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusType } from './busEntity';
import { CreateBusTypeDto } from './dto/busDto';
import { UpdateBusTypeDto } from './dto/busUpdateDto';

@Injectable()
export class BusTypeService {
  constructor(
    @InjectRepository(BusType)
    private readonly busTypeRepository: Repository<BusType>,
  ) {}

  async create(createBusTypeDto: CreateBusTypeDto): Promise<BusType> {
    const busType = this.busTypeRepository.create(createBusTypeDto);
    return this.busTypeRepository.save(busType);
  }

  async findAll(): Promise<BusType[]> {
    return this.busTypeRepository.find();
  }

  async findOne(id: number): Promise<BusType> {
    const busType = await this.busTypeRepository.findOne({ where: { id } });
    if (!busType) {
      throw new NotFoundException(`Bus Type with ID ${id} not found.`);
    }
    return busType;
  }

  async update(id: number, updateBusTypeDto: UpdateBusTypeDto): Promise<BusType> {
    const busType = await this.findOne(id);
    Object.assign(busType, updateBusTypeDto);
    return this.busTypeRepository.save(busType);
  }

  async remove(id: number): Promise<void> {
    const busType = await this.findOne(id);
    await this.busTypeRepository.remove(busType);
  }
}
