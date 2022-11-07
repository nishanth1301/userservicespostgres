import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/logger/logger.module';
import { Auth1Controller } from './auth1.controller';
import { Auth1Service } from './auth1.service';
import { User } from './dto/user.entity';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    LoggerModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          privateKey: configService.get<string>('keys.privateKey'),
          publicKey: configService.get<string>('keys.publicKey'),
          signOptions: { expiresIn: '60s', algorithm: 'RS256' },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [Auth1Controller],
  providers: [Auth1Service, JwtStrategy],
})
export class Auth1Module {}
