import { CreateRouteDto } from "./routeDto";
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRoutesDto extends PartialType(CreateRouteDto){}