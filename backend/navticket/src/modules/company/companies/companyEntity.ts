import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Routes } from '../routes/routeEntity';
@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column("text", { array: true, nullable: true })
  officialDocs: string[];

  @Column()
  numberOfBusesVip: number;

  @Column()
  numberOfBusesStandard: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  contactInfo: string;

  @Column({ nullable: true })
  officeLocation: string;

  @ Column()
  plan : string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Routes, (route) => route.company)
  routes: Routes[];
}
