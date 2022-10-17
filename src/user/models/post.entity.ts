import AccountFeed from 'src/account/models/account.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
// @Unique(['email'])
export class UserFeed extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ default: '' })
  phone_number: string;

  @ManyToOne((type) => AccountFeed, (accountfeed) => accountfeed.member, {
    eager: false,
  })
  @JoinColumn({ name: 'account' })
  accountfeed: AccountFeed;
  account: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  member: UserFeed[];
}
export default UserFeed;
