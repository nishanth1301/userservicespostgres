import AccountFeed from 'src/account/models/account.entity';

// export interface UserDto {
//   // id?: number;
//   name?: string;
//   email?: string;
//   password?: string;
//   Phone_number?: string;
//   createdAt?: Date;
//   accountname?: string;
//   account?: AccountFeed;
// }
import { IsAlpha, IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UserDto {
  id: string;
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;

  @IsNotEmpty()
  @Exclude({ toPlainOnly: true })
  password: string;

  @IsNotEmpty()
  accountname: string;
  // accountfeed:AccountFeed;
}
