import { PartialType } from '@nestjs/mapped-types';
import { CreateBusTypeDto } from './busDto';

export class UpdateBusTypeDto extends PartialType(CreateBusTypeDto) {}
