import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Company } from '../companies/companyEntity';

@Entity()
export class Routes {
    @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  origin: string;  // Starting point of the route

  @Column({ length: 100 })
  destination: string;  // Ending point of the route

  @Column('float')
  price: number;  // Ticket price for the route

  @Column({ type: 'time' })
  departureTime: string;  // Departure time

  @Column({ type: 'time' })
  arrivalTime: string;  // Estimated arrival time

  @ManyToOne(() => Company, (company) => company.routes, { eager: true })
  company: Company;  // The bus company offering this route

  @Column('int')
  availableSeats: number;  // Number of available seats for booking

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}