import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './modules/company/companies/companyEntity';
import { CompanyModule } from './modules/company/companies/companiesModule';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SUPABASE_DB_HOST,
      port: parseInt(process.env.SUPABASE_DB_PORT, 10),
      username: process.env.SUPABASE_DB_USERNAME,
      password: process.env.SUPABASE_DB_PASSWORD,
      database: process.env.SUPABASE_DB_NAME,
      entities: [Company],
      synchronize: true,
    }),

    CompanyModule,
    TypeOrmModule.forFeature([Company]),
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}

