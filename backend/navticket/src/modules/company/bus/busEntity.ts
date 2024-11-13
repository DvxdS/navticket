import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class BusType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;  // e.g., "Standard", "VIP"

  @Column()

  capacity: number;

  @Column({ nullable: true })
  description: string;
}
