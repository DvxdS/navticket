import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './modules/company/companies/companyEntity';
import { CompanyModule } from './modules/company/companies/companiesModule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
console.log({
  url : process.env.SUPABASE_URL,
  host: process.env.SUPABASE_DB_HOST,
  port: process.env.SUPABASE_DB_PORT,
  username: process.env.SUPABASE_DB_USERNAME,
  password: process.env.SUPABASE_DB_PASSWORD,
  database: process.env.SUPABASE_DB_NAME,
});


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-eu-west-3.pooler.supabase.com',
      port: 6543,
      username: 'postgres.xootvwbijtuuyarazfvp',
      password: '6NMRY0Um8IYmJxXF',
      database: 'postgres',
      entities : [Company],
      synchronize: true
    }),

    CompanyModule,
    TypeOrmModule.forFeature([Company]),
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}

