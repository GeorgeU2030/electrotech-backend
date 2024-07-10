import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { registerDTO } from 'src/auth/DTO/registerDTO';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}
    
    async findOne(email: string): Promise<User | null> {
        return this.userModel.findOne({ email });
    }

    async create(user: registerDTO) {
        return this.userModel.create(user);
    }
}
