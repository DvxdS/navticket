import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Company } from '../companies/companyEntity';
import { Schedule } from '../schedule/scheduleEntity';
@Entity()
export class BusType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // "Standard" or "VIP"

  @Column()
  capacity: number; // Number of seats

  @Column({ nullable: true })
  description: string; // Characteristics of the bus type

  @ManyToOne(() => Company, (company) => company.busTypes, { onDelete: 'CASCADE' })
  company: Company; // Each bus type belongs to a company

  @OneToMany(() => Schedule, (schedule) => schedule.busType)
  schedules: Schedule[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
