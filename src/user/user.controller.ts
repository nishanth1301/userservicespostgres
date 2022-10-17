import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import UserFeed from './models/post.entity';
import { UserDto } from './models/post.interface';
import { UserService } from './user.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { UserFilterDto } from './models/Userfilter.dto';
import { encodePassword } from 'src/utilits/utilis';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('')
  async create(@Body() params: UserDto): Promise<any> {
    const password = await encodePassword(params.password);
    params.password = password;
    try {
      return await this.userService.create(params);
    } catch {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
  }
  // @Get('/users')
  // async findall(
  //   @Query()
  //   param: UserFilterDto,
  // ): Promise<any> {
  //   if (Object.keys(param).length) {
  //     return this.userService.findWithFilters(param);
  //   } else {
  //     return this.userService.getAll();
  //   }
  // }
  @Get('')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query()
    param: UserFilterDto,
  ): Promise<any> {
    limit = limit > 100 ? 100 : limit;
    if (Object.keys(param).length) {
      return this.userService.findWithFilters(param);
    } else {
      return this.userService.paginate({
        page,
        limit,
      });
    }
  }
}
//   @Get('/acc')
//   index(
//     @Query('page', new DefaultValuePipe(1), ParseIntPipe)
//     page = 1,
//     @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
//     @Query('name') name: string,
//   ): Observable<Pagination<UserFeed>> {
//     limit = limit > 100 ? 100 : limit;

// }
