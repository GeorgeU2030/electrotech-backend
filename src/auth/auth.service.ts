import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { loginDTO } from './DTO/loginDTO';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async signIn(logindto: loginDTO): Promise<{accessToken:string}> {

    const user = await this.usersService.findOne(logindto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const match = await bcrypt.compare(logindto.password, user.password);

    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email };

    return {
      accessToken: await this.jwtService.signAsync(payload)
    };
   
  }
  
}