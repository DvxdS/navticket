import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from "../companies/companyEntity";
import { RouteController } from "./routesController";
import { RouteService } from "./routeService";
import { Routes } from "./routeEntity"


@Module({
    imports: [TypeOrmModule.forFeature([Routes, Company])],
    controllers: [RouteController],
    providers: [RouteService],
  })
  export class RouteModule {}
