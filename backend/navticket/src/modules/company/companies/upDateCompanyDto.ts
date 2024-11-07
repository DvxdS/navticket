import { CreateCompanyDto } from "./companiesDto";
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}