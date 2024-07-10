import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { loginDTO } from './DTO/loginDTO';
import * as bcrypt from 'bcrypt';
import { registerDTO } from './DTO/registerDTO';

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

        const payload = { email: user.email, roles: user.role};

        return {
            accessToken: await this.jwtService.signAsync(payload)
        };
   
    }


    async signUp(registerdto: registerDTO) : Promise<void> {

        const user = await this.usersService.findOne(registerdto.email);

        if (user) {
            throw new UnauthorizedException('User already exists');
        }

        const hashedPassword = bcrypt.hashSync(registerdto.password, 8);

        const userCreated = await this.usersService.create({
            email: registerdto.email,
            password: hashedPassword,
            name: registerdto.name,
            role: 'user'
        })

        if (!userCreated) {
            throw new UnauthorizedException('User not created');
        }

    }

}