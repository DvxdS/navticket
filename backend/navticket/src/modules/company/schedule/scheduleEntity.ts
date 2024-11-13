import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Routes } from "../routes/routeEntity";
import { BusType } from "../bus/busEntity";

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Routes, (route) => route.schedules, { eager: true })
  route: Routes;

  @ManyToOne(() => BusType, (busType) => busType.id, { eager: true })
  busType: BusType;

  @Column('time')
  departureTime: string; 

  @Column('time', { nullable: true })
  arrivalTime: string; 


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}