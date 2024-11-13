import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Company } from '../companies/companyEntity';
import { Schedule } from '../schedule/scheduleEntity';

@Entity()
export class Routes {
    @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  origin: string;  

  @Column({ length: 100 })
  destination: string;  

  @Column('float')
  price: number;  

  @Column('float')
  distance
  

  @ManyToOne(() => Company, (company) => company.routes, { eager: true })
  company: Company;  

  @Column('int')
  availableSeats: number; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(() => Schedule, (schedule) => schedule.route)
  schedules: Schedule[];
}