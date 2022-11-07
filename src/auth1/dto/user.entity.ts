import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuthDto } from './auth.dto';

@Entity()
export class User {
//   save(params: AuthDto): any {
//     throw new Error('Method not implemented.');
//   }
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ default: '' })
  email: string;
  @Column({ default: '' })
  password: string;
}
