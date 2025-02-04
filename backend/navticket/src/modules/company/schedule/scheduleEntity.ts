import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';
import { Routes } from "../routes/routeEntity";
import { BusType } from "../bus/busEntity";

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Routes, (route) => route.schedules, { eager: true })
  route: Routes;

  @ManyToOne(() => BusType, (busType) => busType.schedules, { eager: true }) // Fix relationship
  busType: BusType;

  @Column('time')
  departureTime: string;

  @Column('time', { nullable: true })
  arrivalTime: string;

  @Column('uuid', { default: () => 'uuid_generate_v4()' })
  scheduleGroup: string; 

  @Column('int', { nullable: true })
  durationInHour: number; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
