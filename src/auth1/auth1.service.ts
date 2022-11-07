import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { LoggerService } from 'src/logger/logger.service';
import { UserDto } from 'src/user/models/post.interface';
import { Repository } from 'typeorm';
import { User } from './dto/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class Auth1Service {
  constructor(
    private logger: LoggerService,
    private jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRespository: Repository<User>,
  ) {}
  async validateUser(params: any): Promise<any> {
    let isOk = false;
    const user = new UserDto();
    user.email = params.email;
    user.password = params.password;
    await validate(user).then((errors) => {
      if (errors.length > 0) {
        this.logger.debug(`${errors}`, Auth1Service.name);
      } else {
        isOk = true;
      }
    });
    if (isOk) {
      // Get user information
      const userDetails = await this.userRespository.findOne({
        where: { email: params.email },
      });
      if (userDetails == null) {
        return { status: 401, msg: { msg: 'Invalid credentials' } };
      }
      const isValid = bcrypt.compareSync(user.password, userDetails.password);
      if (isValid) {
        return {
          status: 200,
          msg: {
            email: user.email,
            access_token: this.jwtService.sign({ email: user.email }),
          },
        };
      } else {
        return { status: 401, msg: { msg: 'Invalid credentials' } };
      }
    } else {
      return { status: 400, msg: { msg: 'Invalid fields.' } };
    }
  }

  async createUser(body: any): Promise<Record<string, any>> {
    // Validation Flag
    let isOk = false;
    // Transform body into DTO
    const userDTO = new UserDto();
    userDTO.email = body.email;
    userDTO.password = bcrypt.hashSync(body.password, 10);
    // Validate DTO against validate function from class-validator
    await validate(userDTO).then((errors) => {
      if (errors.length > 0) {
        this.logger.debug(`${errors}`, Auth1Service.name);
      } else {
        isOk = true;
      }
    });
    if (isOk) {
      await this.userRespository.save(userDTO).catch((error) => {
        this.logger.debug(error.message, Auth1Service.name);
        isOk = false;
      });
      if (isOk) {
        return { status: 201, content: { msg: `User created with success` } };
      } else {
        return { status: 400, content: { msg: 'User already exists' } };
      }
    } else {
      return { status: 400, content: { msg: 'Invalid content' } };
    }
  }
}
