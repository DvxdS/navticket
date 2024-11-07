import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './companyEntity';
import { CreateCompanyDto } from './companiesDto';
import { UpdateCompanyDto } from './upDateCompanyDto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  // 1. Create a New Company
  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const newCompany = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(newCompany);
  }

  // 2. Find a Company by ID
  async findOne(id: string): Promise<Company> {
    return await this.companyRepository.findOneBy({ id });
  }

  // 3. Update Company Details
  async update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    await this.companyRepository.update(id, updateCompanyDto);
    return this.findOne(id); // Return updated company details
  }

  // 4. Delete a Company
  async remove(id: string): Promise<void> {
    await this.companyRepository.delete(id);
  }

  // 5. List All Companies (optional for listing)
  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }
}

