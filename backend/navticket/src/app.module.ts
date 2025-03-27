import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './modules/company/companies/companyEntity';
import { CompanyModule } from './modules/company/companies/companiesModule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Routes } from './modules/company/routes/routeEntity';
import { RouteModule } from './modules/company/routes/routeModule';
import { Schedule } from './modules/company/schedule/scheduleEntity';
import { ScheduleModule } from './modules/company/schedule/scheduleModule';
import { BusType } from './modules/company/bus/busEntity';
import { AuthModule } from './modules/auth/authModule';
import { BusTypeModule } from './modules/company/bus/dto/busModule';
import { UploadModule } from './modules/upload/upload.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-eu-west-3.pooler.supabase.com',
      port: 6543,
      username: 'postgres.xootvwbijtuuyarazfvp',
      password: '6NMRY0Um8IYmJxXF',
      database: 'postgres',
      entities : [Company, Routes, Schedule, BusType],
      synchronize: true
    }),
    AuthModule,
    CompanyModule,
    RouteModule,
    ScheduleModule,
    BusTypeModule,
    UploadModule,
    TypeOrmModule.forFeature([Company, Routes, Schedule]),
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}

