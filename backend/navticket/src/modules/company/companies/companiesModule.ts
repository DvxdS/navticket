import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyService } from './companiesServices';
import { CompanyController } from './companiesController';
import { Company } from './companyEntity';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],  // Export the service if needed elsewhere
})
export class CompanyModule {}
