import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import AccountFeed from 'src/account/models/account.entity';
import { Like, Repository } from 'typeorm';
import { UserFeed } from './models/post.entity';
import { UserDto } from './models/post.interface';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { UserFilterDto } from './models/Userfilter.dto';
import { AccountDto } from 'src/account/models/account.interface';
import { encodePassword } from 'src/utilits/utilis';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserFeed)
    private readonly UserPostRepository: Repository<UserFeed>,
  ) {}
  async create(params: UserDto): Promise<any> {
    const password = await encodePassword(params.password);
    params.password = password;
    return this.UserPostRepository.save(params);
  }
  async findWithFilters(filter: UserFilterDto) {
    return await this.UserPostRepository.find({
      where: [{ name: Like(`%${filter.name}%`) }],
    });
  }
  async getAll() {
    return await this.UserPostRepository.find();
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<UserFeed>> {
    const queryBuilder = this.UserPostRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.createdAt', 'ASC');
    return paginate<UserFeed>(queryBuilder, options);
  }
  // paginate(options: IPaginationOptions): Observable<Pagination<UserFeed>> {
  //     return from(paginate<User>(this.UserPostRepository, options)).pipe(
  //         map((usersPageable: Pagination<UserFeed>) => {
  //         usersPageable.items.forEach(function (v) {
  //             return usersPageable;
  //         }).queryBuilder.orderBy('c.createdAt', 'DESC');
  //     )
  // }
  //   paginateFilterByUsername(
  //     options: IPaginationOptions,
  //     user: UserFeed,
  //   ): Observable<Pagination<UserFeed>> {
  //     return from(
  //       this.UserPostRepository.findAndCount({
  //         skip: Number(options.page) * Number(options.limit) || 0,
  //         take: Number(options.limit) || 10,
  //         select: [, 'name', 'email','Phone_number'],
  //         where: [{ name: Like(`%${user.name}%`) }],
  //       }),
  //     ).pipe(
  //       map(([users, totalUsers]) => {
  //         const usersPageable: Pagination<UserFeed> = {
  //           .queryBuilder.orderBy('c.createdAt', 'DESC');items: users,
  //           links: {
  //             first: options.route + `?limit=${options.limit}`,
  //             previous: options.route + ``,
  //             next:
  //               options.route +
  //               `?limit=${options.limit}&page=${Number(options.page) + 1}`,
  //             last:
  //               options.route +
  //               `?limit=${options.limit}&page=${Math.ceil(
  //                 totalUsers / Number(options.limit),
  //               )}`,filter
  //           },
  //           meta: {
  //             currentPage: Number(options.page),
  //             itemCount: users.length,
  //             itemsPerPage: Numbuserfeeder(options.limit),
  //             totalItems: totalUsers,
  //             totalPages: Math.ceil(totalUsers / Number(options.limit)),
  //           },
  //         }  id: string;
  //         return usersPageable;
  //       }),
  //     );
  // }
  async addAccount(id: string, account: AccountFeed) {
    const user = await this.UserPostRepository.findOne({
      where: {
        id,
      },
    });
    // console.info(user, account);
    user.account = account.id;
    await user.save();
    console.info(user);

    return user;
  }
}
