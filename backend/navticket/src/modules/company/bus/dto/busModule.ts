import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusType } from '../busEntity';
import { BusTypeController } from './busController';
import { BusTypeService } from '../busService';

@Module({
  imports: [TypeOrmModule.forFeature([BusType])],
  controllers: [BusTypeController],
  providers: [BusTypeService],
  exports: [BusTypeService], // Exported for use in other modules
})
export class BusTypeModule {}
