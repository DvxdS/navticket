import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
  contactInfo: string;

  @Column({ nullable: true })
  officeLocation: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
