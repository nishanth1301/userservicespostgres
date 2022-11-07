import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of, switchMap } from 'rxjs';
import UserFeed from 'src/user/models/post.entity';
import { UserDto } from 'src/user/models/post.interface';
import { Repository } from 'typeorm';
import { AccountFeed } from './models/account.entity';
import { AccountDto } from './models/account.interface';
@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountFeed)
    private readonly AccountPostRepository: Repository<AccountFeed>,
  ) {}
  async create(params: AccountDto) {
    console.info(params);
    return await this.AccountPostRepository.save(params);
  }
  async getAll() {
    return await this.AccountPostRepository.find();
  }
  // create(user: UserDto, account: AccountDto): Observable<AccountDto> {
  //   account.members = user;
  //   return this.AccountPostRepository.save(account);
  // }
  // async updatePost(id: string, post, AccountDto) {
  //   await this.AccountPostRepository.update(id, post);
  //   const updatedPost = await this.AccountPostRepository.findOne(id, {
  //     relations: ['member'],
  //   });
  //   if (updatedPost) {
  //     return updatedPost;
  //   }
  //   throw new HttpException('not found', HttpStatus.FORBIDDEN);
  // }
}
