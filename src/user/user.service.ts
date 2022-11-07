import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    return await this.UserPostRepository.find({ relations: ['account'] });
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<UserFeed>> {
    const queryBuilder = this.UserPostRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.createdAt', 'ASC');
    return paginate<UserFeed>(queryBuilder, options);
  }

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
    await this.UserPostRepository.save(user);
    console.info(user);

    return user;
  }
}
