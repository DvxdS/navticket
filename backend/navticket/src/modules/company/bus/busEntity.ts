import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Company } from '../companies/companyEntity';
import { Schedule } from '../schedule/scheduleEntity';
@Entity()
@Entity()
export class BusType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: ['Standard', 'VIP', 'VVIP'] }) // Enforce allowed values
  type: string;

  @Column()
  capacity: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Company, (company) => company.busTypes, { onDelete: 'CASCADE' })
  company: Company;

  @OneToMany(() => Schedule, (schedule) => schedule.busType)
  schedules: Schedule[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
