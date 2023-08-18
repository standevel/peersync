import {
    BadRequestException,
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { SignInDto } from 'src/dto';
import { IUser, User } from 'src/models';

@Injectable()
export class AccountService {
    async getAllUsers() {
        return await this.userModel.find();
    }
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<IUser>,
        private jwtService: JwtService,
    ) { }
    async signUp(createUserDto: IUser) {
        try {
            console.log('user data: ', createUserDto);
            await this.emailExist(createUserDto.email);
            const hash = await bcrypt.hash(createUserDto.password, 10);

            const user = (
                await this.userModel.create({ ...createUserDto, password: hash })
            ).toJSON();
            if (user) {
                return await this.signIn({
                    email: createUserDto.email,
                    password: createUserDto.password,
                });
            }
        } catch (error) {
            console.log('Error: ', error.message);
            throw error;
        }
    }

    async signIn(signinDto: SignInDto) {
        console.log('signIn dto: ', signinDto);
        const found = (
            await this.userModel.findOne({ email: signinDto.email })
        ).toJSON();
        console.log('found: ', found);
        if (!found) throw new UnauthorizedException('Invalid email or password');
        const isMatch = bcrypt.compareSync(signinDto.password, found.password);
        if (!isMatch) throw new UnauthorizedException('Invalid email or password!');

        console.log('found user: ', found);
        // usr name and password is valid
        const { password, ...payload } = found;
        return {
            access_token: this.jwtService.sign(payload),
            user: payload,
        };
    }

    async emailExist(email: string) {
        if (!email) {
            throw new BadRequestException('Email is required');
        }
        const found = await this.userModel.findOne({ email });
        if (found) {
            throw new ConflictException(
                'User with the email ' + email + ' already exist',
            );
        }
        return { exist: false };
    }
}
