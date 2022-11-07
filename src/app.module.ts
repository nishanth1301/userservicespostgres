import { Inject, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { Auth1Module } from './auth1/auth1.module';
import UserFeed from './user/models/post.entity';
import AccountFeed from './account/models/account.entity';
import { User } from './auth1/dto/user.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserFeed, AccountFeed, User]),
    UserModule,
    AccountModule,
    AuthModule,
    Auth1Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
