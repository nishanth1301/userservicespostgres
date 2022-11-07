import UserFeed from 'src/user/models/post.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AccountFeed extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  accountname: string;
  @OneToMany(() => UserFeed, (userfeed) => userfeed.accountfeed, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  member: UserFeed[];
}
export default AccountFeed;
