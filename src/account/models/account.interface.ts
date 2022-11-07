import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import UserFeed from 'src/user/models/post.entity';

export class AccountDto {
  id: string;
  @IsString()
  @IsNotEmpty()
  accountname: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserFeed)
  @IsNotEmpty()
  member: UserFeed[];
}
