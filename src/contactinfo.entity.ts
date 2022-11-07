import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './employee.entity ';

@Entity()
export class Contactinfo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  phone: string;
  @Column()
  email: string;
  @OneToOne(() => Employee, (Employee) => Employee.contactinfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  employee: Employee;
}
