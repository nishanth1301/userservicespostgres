import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Auth1Service } from './auth1.service';
import { JwtAuthGuard } from './strategy/jwt-auth.gaurd';

@Controller('auth1')
export class Auth1Controller {
  constructor(private authService: Auth1Service) {}
  @Post('login')
  async login(@Req() req, @Res() res, @Body() body) {
    const auth = await this.authService.validateUser(body);
    res.status(auth.status).json(auth.msg);
  }
  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(@Req() req, @Res() res, @Body() body) {
    const auth = await this.authService.createUser(body);
    res.status(auth.status).json(auth.content);
  }
}
