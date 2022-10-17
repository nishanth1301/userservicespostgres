import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './models/account.interface';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('')
  async getAllAccounts(): Promise<any> {
    const accounts = await this.accountService.getAll();
    return accounts;
  }
  @Post('')
  async create(@Body() params: AccountDto): Promise<any> {
    return await this.accountService.create(params);
  }
}
