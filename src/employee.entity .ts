import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contactinfo } from './contactinfo.entity';
import { Task } from './task.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => Employee, (employee) => employee.directReports, {
    onDelete: 'SET NULL',
  })
  manager: Employee;
  @OneToMany(() => Employee, (employee) => employee.manager)
  directReports: Employee[];

  @OneToOne(() => Contactinfo, (contactinfo) => contactinfo.employee)
  contactinfo: Contactinfo;
  @OneToMany(() => Task, (task) => task.employee)
  tasks: Task[];
}
