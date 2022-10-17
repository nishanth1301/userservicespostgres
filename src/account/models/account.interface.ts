import { IsNotEmpty, IsString } from 'class-validator';
import UserFeed from 'src/user/models/post.entity';

export class AccountDto {
  id: string;
  @IsString()
  @IsNotEmpty()
  accountname: string;
  @IsNotEmpty()
  member: UserFeed[];
}
