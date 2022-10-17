import { HttpException, Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { UserDto } from 'src/user/models/post.interface';
import { UserService } from 'src/user/user.service';
import { v4 as uuid } from 'uuid';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private accountService: AccountService,
  ) {}
  async signup(params: UserDto): Promise<any> {
    let user = null;
    try {
      user = await this.userService.create(params);
      let account;
      if (user) {
        account = await this.accountService.create({
          accountname: params.accountname,
          member: [user],
          id: uuid(),
        });
      }
      let userinfo;
      if (account) {
        userinfo = await this.userService.addAccount(user.id, account);
      }
      return { success: true, user: account, userinfo };
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }
}
